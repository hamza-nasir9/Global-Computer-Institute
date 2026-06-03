'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Menu, X, Sun, Moon, GraduationCap, LogIn,
  LayoutDashboard, LogOut, ChevronDown, Home,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth }  from '@/context/AuthContext';
import { gsap } from '@/lib/gsap';

const NAV_LINKS = [
  { label: 'Home',       href: '/'           },
  { label: 'About',      href: '/about'      },
  { label: 'Courses',    href: '/courses'    },
  { label: 'Admissions', href: '/admissions' },
  { label: 'Campuses',   href: '/campuses'   },
  { label: 'Gallery',    href: '/gallery'    },
  { label: 'Contact',    href: '/contact'    },
];
// Shown only to authenticated (non-admin) users
const AUTH_NAV_LINKS = [
  { label: 'Tracking ID', href: '/track' },
];

export default function Navbar() {
  // ── All hooks unconditionally at top ─────────────────────────────────────
  const [scrolled,    setScrolled]    = useState(false);
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, logout }       = useAuth();
  const pathname   = usePathname();
  const router     = useRouter();
  const navRef     = useRef(null);
  const thumbRef   = useRef(null);
  const mobileRef  = useRef(null);
  const profileRef = useRef(null);

  const isDark  = theme === 'dark';
  const isHome  = pathname === '/';
  const isSolid = scrolled || !isHome;
  const isAdmin = user?.role === 'admin';
  const dashHref = '/dashboard/admin';

  /* Entrance */
  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(navRef.current,
      { y: -72 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.05, clearProps: 'transform,opacity' }
    );
  }, []);

  /* Scroll */
  useEffect(() => {
    if (!isHome) { setScrolled(true); return; }
    let ticking = false;
    const fn = () => {
      if (!ticking) {
        requestAnimationFrame(() => { setScrolled(window.scrollY > 40); ticking = false; });
        ticking = true;
      }
    };
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, [isHome]);

  /* Body scroll lock */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  /* ─────────────────────────────────────────────────────────────────────────
     Mobile menu animation
     FIX: Do NOT put background on the div via inline style on the initial
     server render — it depends on isDark which mismatches during hydration.
     Instead: set the background imperatively in this useEffect only.
     Also: reset [data-ml] children's opacity before every open so re-opens work.
  ───────────────────────────────────────────────────────────────────────── */
  useEffect(() => {
    const el = mobileRef.current;
    if (!el) return;

    if (menuOpen) {
      /* Set background imperatively — theme-safe, no hydration issue */
      el.style.backgroundColor = isDark ? '#080808' : '#ffffff';
      el.style.display = 'flex';
      el.style.opacity = '1';

      /* Reset child items before animating (fix re-open opacity:0 from CSS) */
      const items = el.querySelectorAll('[data-ml]');
      gsap.set(items, { opacity: 0, y: 16 });

      /* Slide in from right */
      gsap.fromTo(el,
        { x: '100%' },
        { x: '0%', duration: 0.3, ease: 'power3.out', clearProps: 'x' }
      );
      /* Stagger items in */
      gsap.to(items, {
        opacity: 1, y: 0, stagger: 0.05, duration: 0.28, ease: 'power2.out', delay: 0.12
      });
    } else {
      gsap.to(el, {
        x: '100%', duration: 0.24, ease: 'power2.in',
        onComplete: () => { if (el) { el.style.display = 'none'; el.style.removeProperty('x'); } }
      });
    }
  }, [menuOpen, isDark]);

  /* Theme pill thumb */
  useEffect(() => {
    if (thumbRef.current) {
      gsap.to(thumbRef.current, { x: isDark ? 0 : 36, duration: 0.28, ease: 'power2.inOut' });
    }
  }, [isDark]);

  /* Profile dropdown outside click */
  useEffect(() => {
    if (!profileOpen) return;
    const fn = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, [profileOpen]);

  function handleLogout() {
    logout();
    setProfileOpen(false);
    setMenuOpen(false);
    router.push('/');
  }

  /* Style tokens */
  const navBg = isSolid
    ? isDark
      ? 'bg-[#0a0a0a]/95 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.06)]'
      : 'bg-white shadow-[0_1px_0_rgba(0,0,0,0.08)]'
    : 'bg-transparent';

  const linkCls = isSolid
    ? isDark  ? 'text-white/75 hover:text-[#F5C842]'
              : 'text-stone-600 hover:text-[#9B6F0A]'
    : 'text-white/85 hover:text-[#F5C842]';

  const solidText  = isSolid && !isDark ? 'text-stone-900' : 'text-white';
  const solidMuted = isSolid && !isDark ? 'text-stone-400' : 'text-white/35';

  return (
    <>
      {/* ── Desktop / main nav ─────────────────────────────────────────── */}
      <nav ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow] duration-300 ${navBg}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center h-16 gap-4 md:gap-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
            {/*
              Both logo files contain dark/black content on transparent background.
              On dark navbar: apply brightness(0) invert(1) to turn black → white.
              On light navbar: show logo as-is (black on white = visible).
              suppressHydrationWarning: isDark/isSolid are client-only state.
            */}
            <img
              src="/images/logo-light.png"
              alt="Global Computer Institute"
              suppressHydrationWarning
              className="h-10 w-auto object-contain transition-all duration-200"
              style={{
                filter: (isSolid && !isDark)
                  ? 'none'                              /* light solid navbar → dark logo visible */
                  : 'brightness(0) invert(1)',           /* dark/transparent navbar → invert to white */
              }}
            />
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-5 xl:gap-6 flex-1">
            {[...NAV_LINKS, ...(user ? AUTH_NAV_LINKS : [])].map(({ label, href }) => {
              const active = pathname === href || (href !== '/' && pathname.startsWith(href));
              return (
                <li key={label}>
                  <Link href={href}
                    className={`relative text-sm font-medium tracking-wide transition-colors duration-150 group ${linkCls}`}>
                    {label}
                    <span className={`absolute -bottom-0.5 left-0 h-[2px] bg-[#D4A017] rounded-full transition-[width] duration-300 ${active ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop right controls */}
          <div className="hidden lg:flex items-center gap-2.5 ml-auto flex-shrink-0">
            {/* Theme pill */}
            <button onClick={toggleTheme} aria-label="Toggle theme"
              className={`relative w-[66px] h-[32px] rounded-full border flex items-center cursor-pointer px-1 transition-colors duration-200 ${
                isDark ? 'bg-white/5 border-white/10 hover:border-[#D4A017]/40'
                       : 'bg-stone-100 border-stone-300 hover:border-[#D4A017]/50'}`}>
              <Sun  size={12} className={`absolute left-1.5 transition-opacity ${isDark ? 'opacity-25 text-white' : 'opacity-0'}`} />
              <Moon size={12} className={`absolute right-1.5 transition-opacity ${isDark ? 'opacity-0' : 'opacity-30 text-stone-500'}`} />
              <div ref={thumbRef}
                className="w-[24px] h-[24px] rounded-full bg-gold-gradient flex items-center justify-center shadow-sm will-change-transform"
                style={{ transform: 'translateX(0px)' }}>
                {isDark ? <Sun size={12} className="text-black" /> : <Moon size={12} className="text-black" />}
              </div>
            </button>

            {/* Auth */}
            {user ? (
              <div className="relative" ref={profileRef}>
                <button onClick={() => setProfileOpen(p => !p)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
                    isDark ? 'border-white/15 hover:border-[#D4A017]/40'
                           : 'border-stone-300 hover:border-[#D4A017]/50 bg-white/50'}`}>
                  <div className="w-6 h-6 rounded-full bg-gold-gradient flex items-center justify-center font-bold text-black text-[11px]">
                    {user.name?.[0]?.toUpperCase()}
                  </div>
                  <span className={`text-sm font-medium max-w-[90px] truncate ${isSolid && !isDark ? 'text-stone-800' : 'text-white/90'}`}>
                    {user.name.split(' ')[0]}
                  </span>
                  <ChevronDown size={12} className={`transition-transform ${profileOpen ? 'rotate-180' : ''} ${isSolid && !isDark ? 'text-stone-500' : 'text-white/40'}`} />
                </button>
                {profileOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl border z-50 overflow-hidden"
                    style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-gold)', boxShadow: 'var(--shadow-card)' }}>
                    <div className="px-4 py-3 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
                      <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{user.name}</p>
                      <p className="text-xs truncate mt-0.5" style={{ color: 'var(--text-muted)' }}>{user.email}</p>
                    </div>
                    <div className="py-1">
                      {isAdmin && (
                        <Link href={dashHref} onClick={() => setProfileOpen(false)}
                          className="flex items-center px-4 py-2.5 text-sm transition-colors"
                          style={{ color: 'var(--text-secondary)' }}
                          onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                          onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}>
                          Admin Dashboard
                        </Link>
                      )}
                      <Link href="/" onClick={() => setProfileOpen(false)}
                        className="flex items-center px-4 py-2.5 text-sm transition-colors"
                        style={{ color: 'var(--text-secondary)' }}
                        onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                        onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}>
                        Back to Website
                      </Link>
                      <hr style={{ borderColor: 'var(--border-subtle)', margin: '4px 0' }} />
                      <button onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2.5 text-sm text-red-400 hover:text-red-300 transition-colors"
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(239,68,68,.07)'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                        <LogOut size={14} className="mr-2" />Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth/login"
                  className={`flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-full border transition-all ${
                    isSolid && !isDark
                      ? 'border-stone-300 text-stone-700 hover:border-[#D4A017] hover:text-[#9B6F0A]'
                      : 'border-white/20 text-white/85 hover:border-[#D4A017]/60 hover:text-[#F5C842]'}`}>
                  <LogIn size={14} />Login
                </Link>
                <Link href="/admission-form"
                  className="flex items-center gap-1.5 bg-gold-gradient text-black font-bold text-sm px-4 py-2 rounded-full transition-transform hover:scale-105 hover:-translate-y-0.5 active:scale-95"
                  style={{ boxShadow: 'var(--shadow-gold-sm)' }}>
                  <GraduationCap size={14} />Apply Now
                </Link>
              </>
            )}
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 lg:hidden ml-auto flex-shrink-0">
            <button onClick={toggleTheme} aria-label="Toggle theme"
              className={`w-8 h-8 rounded-full flex items-center justify-center border transition-colors ${
                isSolid && !isDark ? 'border-stone-300 text-stone-600' : 'border-white/20 text-white/70 hover:text-[#F5C842]'}`}>
              {isDark ? <Sun size={14} /> : <Moon size={14} />}
            </button>
            <button onClick={() => setMenuOpen(o => !o)}
              className={`p-2 rounded-lg transition-colors ${isSolid && !isDark ? 'text-stone-800 hover:bg-stone-100' : 'text-white hover:bg-white/10'}`}
              aria-label="Toggle menu" aria-expanded={menuOpen}>
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile full-screen menu ─────────────────────────────────────────
          CRITICAL FIXES:
          1. No inline background on render — set imperatively in useEffect
             to avoid hydration mismatch (isDark differs server vs client)
          2. display:none is safe here — GSAP sets it to 'flex' before animating
          3. [data-ml] items get gsap.set(opacity:0,y:16) before each open
             so re-opens always animate correctly
      ──────────────────────────────────────────────────────────────────── */}
      <div
        ref={mobileRef}
        className="fixed inset-0 z-40 lg:hidden flex-col items-center justify-center gap-6 px-6"
        style={{ display: 'none' }}
        aria-hidden={!menuOpen}
      >
        {/* Close button */}
        <button onClick={() => setMenuOpen(false)}
          className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'rgba(212,160,23,0.12)', border: '1px solid rgba(212,160,23,0.25)' }}
          aria-label="Close menu">
          <X size={20} className="text-[#D4A017]" />
        </button>

        {/* Logo */}
        <div data-ml className="flex items-center gap-2.5 mb-2">
          <img
            src="/images/logo-light.png"
            alt="Global Computer Institute"
            className="h-10 w-auto object-contain"
            style={{
              filter: isDark ? 'brightness(0) invert(1)' : 'none',
            }}
          />
        </div>

        {/* Nav links */}
        {[...NAV_LINKS, ...(user ? AUTH_NAV_LINKS : [])].map(({ label, href }) => {
          const active = pathname === href || (href !== '/' && pathname.startsWith(href));
          return (
            <Link key={label} href={href} data-ml
              onClick={() => setMenuOpen(false)}
              className="text-xl font-semibold transition-colors"
              style={{ color: active ? '#D4A017' : 'var(--text-primary)' }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.color = '#D4A017'; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.color = 'var(--text-primary)'; }}>
              {label}
            </Link>
          );
        })}

        {/* Divider + Auth buttons */}
        <div className="w-full max-w-[280px] space-y-3" data-ml>
          <div className="border-t" style={{ borderColor: 'var(--border-subtle)' }} />
          {user ? (
            <>
              {/* User info chip */}
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-2xl"
                style={{ backgroundColor: 'var(--bg-input)', border: '1px solid rgba(212,160,23,0.20)' }}>
                <div className="w-9 h-9 rounded-full bg-gold-gradient flex items-center justify-center font-bold text-black text-sm flex-shrink-0">
                  {user.name?.[0]?.toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{user.name}</p>
                  <p className="text-[10px] truncate" style={{ color: 'var(--text-muted)' }}>{user.email}</p>
                </div>
              </div>
              <Link href={dashHref} onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl border font-semibold text-sm"
                style={{ borderColor: 'rgba(212,160,23,0.40)', color: '#D4A017', backgroundColor: 'rgba(212,160,23,0.06)', display: isAdmin ? 'flex' : 'none' }}>
                <LayoutDashboard size={15} />Admin Dashboard
              </Link>
              <button onClick={handleLogout}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl font-semibold text-sm border"
                style={{ borderColor: 'rgba(239,68,68,0.25)', color: '#f87171', backgroundColor: 'rgba(239,68,68,0.06)' }}>
                <LogOut size={15} />Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/auth/login" onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl border font-semibold text-sm"
                style={{ borderColor: 'var(--border-medium)', color: 'var(--text-primary)', backgroundColor: 'var(--bg-input)' }}>
                <LogIn size={15} />Login
              </Link>
              <Link href="/admission-form" onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-gold-gradient text-black font-bold py-3 rounded-2xl text-sm"
                style={{ boxShadow: '0 4px 16px rgba(212,160,23,0.28)' }}>
                <GraduationCap size={15} />Apply Now
              </Link>
              <Link href="/" onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2 text-sm"
                style={{ color: 'var(--text-muted)' }}>
                <Home size={14} />Back to Home
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
