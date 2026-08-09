import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`[Atlas G-Market API] Serveur démarré sur le port ${PORT}`);
  console.log(`[Atlas G-Market API] URL: http://localhost:${PORT}`);
});