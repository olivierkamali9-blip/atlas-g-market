import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

export const pool = new Pool({
  connectionString,
  ssl: process.env.NODE_ENV === 'production' || connectionString?.includes('neon.tech')
    ? { rejectUnauthorized: false }
    : false,
});

export const query = async (text: string, params?: any[]) => {
  const client = await pool.connect();
  try {
    return await client.query(text, params);
  } finally {
    client.release();
  }
};

export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    const res = await query('SELECT NOW()');
    return !!res.rows[0];
  } catch (error) {
    console.error('Erreur de connexion à la base de données Neon PostgreSQL:', error);
    return false;
  }
}