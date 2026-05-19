'use client';
/**
 * AuthContext — single source of truth for authentication state.
 *
 * MODE = 'local'  (default) → localStorage only, works with no server setup
 * MODE = 'api'               → calls /api/auth/register + /api/auth/login (MongoDB)
 *
 * To enable API mode: add NEXT_PUBLIC_AUTH_MODE=api to .env.local
 *
 * User shape: { id, name, email, phone, role: 'student'|'admin', createdAt }
 */
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext({
  user: null, loading: true,
  login: async () => { }, register: async () => { }, logout: () => { },
});



const STORAGE_KEY = 'gci_user';
const USERS_KEY = 'gci_users';

const USE_API =
  typeof process !== 'undefined' &&
  process.env.NEXT_PUBLIC_AUTH_MODE === 'api';

/* ────────────────────────────────────────────────────────────────
   LOCAL (Phase 1) helpers
──────────────────────────────────────────────────────────────── */
function getUsers() {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); } catch { return []; }
}
function saveUsers(arr) {
  try { localStorage.setItem(USERS_KEY, JSON.stringify(arr)); } catch { }
}
function seedAdmin() {
  const users = getUsers();
  if (!users.some(u => u.email === 'admin@gmail.com')) {
    saveUsers([...users, {
      id: 'admin-seed', name: 'GCI Admin',
      email: 'admin@gmail.com', password: 'Admin@123',
      role: 'admin', createdAt: new Date().toISOString(),
    }]);
  }
}

async function localLogin({ email, password }) {
  seedAdmin();
  const found = getUsers().find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!found) throw new Error('Invalid email or password');
  const { password: _, ...safe } = found;
  return safe;
}

async function localRegister({ name, email, password, phone }) {
  seedAdmin();
  const users = getUsers();
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase()))
    throw new Error('An account with this email already exists');
  const newUser = {
    id: `u-${Date.now()}`, name, email: email.toLowerCase(),
    password, phone: phone || '', role: 'student',
    createdAt: new Date().toISOString(),
  };
  saveUsers([...users, newUser]);
  const { password: _, ...safe } = newUser;
  return safe;
}

/* ────────────────────────────────────────────────────────────────
   API (Phase 2) helpers
──────────────────────────────────────────────────────────────── */
async function apiLogin({ email, password }) {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Login failed');
  // Normalise _id → id
  const u = data.user;
  return { ...u, id: u._id || u.id };
}

async function apiRegister({ name, email, password, phone }) {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, phone }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Registration failed');
  const u = data.user;
  return { ...u, id: u._id || u.id };
}

/* ────────────────────────────────────────────────────────────────
   Provider
──────────────────────────────────────────────────────────────── */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* Restore session from localStorage on mount */
  useEffect(() => {
    if (typeof window === 'undefined') return;
    seedAdmin();
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setUser(JSON.parse(stored));
    } catch { }
    setLoading(false);
  }, []);

  const login = useCallback(async (credentials) => {
    const safe = USE_API
      ? await apiLogin(credentials)
      : await localLogin(credentials);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safe));
    // legacy compat: keep sessionStorage admin flag for old /admin page
    if (safe.role === 'admin') {
      try { sessionStorage.setItem('gci_admin', 'true'); } catch { }
    }
    setUser(safe);
    return safe;
  }, []);

  const register = useCallback(async (data) => {
    const safe = USE_API
      ? await apiRegister(data)
      : await localRegister(data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(safe));
    setUser(safe);
    return safe;
  }, []);

  const logout = useCallback(() => {
    try { localStorage.removeItem(STORAGE_KEY); } catch { }
    try { sessionStorage.removeItem('gci_admin'); } catch { }
    setUser(null);
    // loading stays false after initial mount, logout is instant
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
