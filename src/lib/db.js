/**
 * src/lib/db.js
 * MongoDB singleton connection — database: "global"
 * Collections: users, admissions
 *
 * Cached on global to survive Next.js hot-reloads.
 * Returns null gracefully when MONGODB_URI is not set.
 * Throws on real connection errors so API routes can return 503.
 */
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// Cache on global object to survive hot-reload in dev
if (!global._gciMongo) {
  global._gciMongo = { conn: null, promise: null };
}

export default async function dbConnect() {
  // No URI set — offline/local mode
  if (!MONGODB_URI) {
    console.warn('[db] MONGODB_URI not set — running without database');
    return null;
  }

  const cache = global._gciMongo;

  // Already connected
  if (cache.conn) return cache.conn;

  // Connection in progress — wait for it
  if (!cache.promise) {
    const opts = {
      dbName:                   'global',
      bufferCommands:           false,
      maxPoolSize:              10,
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS:          45000,
      connectTimeoutMS:         10000,
    };

    cache.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then(m => {
        console.log('[db] ✓ MongoDB connected → database: global');
        return m.connection;
      })
      .catch(err => {
        cache.promise = null; // reset so next call retries
        console.error('[db] ✗ Connection failed:', err.message);
        throw err;
      });
  }

  try {
    cache.conn = await cache.promise;
    return cache.conn;
  } catch (err) {
    cache.promise = null;
    throw err;
  }
}
