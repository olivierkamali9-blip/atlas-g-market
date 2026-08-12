import pool from '../src/config/neonDatabase';

async function initDb() {
  await pool.query(`CREATE TABLE IF NOT EXISTSannonce (
    id SERIAL PRIMARY KEY,
    titre VARCHAR(255) NOT NULL,
    contenu TEXT NOT NULL
  );`);

  console.log('Base de données initialisée avec succès');
}

initDb();