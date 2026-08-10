import express from 'express';
import { ageVerification } from '../middlewares/ageVerification';

const router = express.Router();

router.post('/register', ageVerification, (req, res) => {
  // Logique d'inscription
  res.status(201).json({ message: 'User registered successfully' });
});

router.post('/login', ageVerification, (req, res) => {
  // Logique de connexion
  res.status(200).json({ message: 'Login successful' });
});

export default router;