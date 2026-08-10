import express, { Request, Response } from 'express';
import { searchService } from '../services/searchService';

const router = express.Router();

router.get('/recherche', async (req: Request, res: Response) => {
  try {
    const results = await searchService.search(req.query);
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la recherche' });
  }
});

export default router;