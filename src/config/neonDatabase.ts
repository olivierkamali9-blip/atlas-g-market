import { Pool } from 'pg';

const neonConfig = {
  user: 'mon_utilisateur_neon',
  host: 'mon_instance_neon.neon.tech',
  database: 'ma_base_de_donnes',
  password: 'mon_mot_de_passe_neon',
  port: 5432,
};

const pool = new Pool(neonConfig);

export default pool;