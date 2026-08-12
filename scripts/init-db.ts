import fs from 'fs';
import path from 'path';
import { pool } from '../src/config/database';

async function initDB() {
  console.log('Initialisation du schéma sur la base Neon PostgreSQL...');
  try {
    const schemaPath = path.join(__dirname, '../src/db/schema.sql');
    const sql = fs.readFileSync(schemaPath, 'utf-8');
    await pool.query(sql);
    console.log('✅ Base de données initialisée avec succès sur Neon !');
  } catch (error) {
    console.error('❌ Échec de l\'initialisation de la base de données :', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

initDB();