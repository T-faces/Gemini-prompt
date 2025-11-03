import pkg from 'pg';
const { Pool } = pkg;

// Gunakan variable environment dari Vercel
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export default pool;
