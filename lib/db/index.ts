// Database connection - SQLite for local, Turso for production
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from './schema';

// Environment-based database selection
const isProduction = process.env.NODE_ENV === 'production';
const databaseUrl = process.env.DATABASE_URL;

// Local SQLite database path
const LOCAL_DB_PATH = process.env.LOCAL_DB_PATH || './noorish.db';

// Create SQLite connection for local development
export function getLocalDb() {
  const sqlite = new Database(LOCAL_DB_PATH);
  sqlite.pragma('journal_mode = WAL');
  return drizzle(sqlite, { schema });
}

// For Turso in production, use the HTTP client directly via API routes
// This is handled at the API route level for better compatibility

export { schema };
export type DatabaseSchema = typeof schema;