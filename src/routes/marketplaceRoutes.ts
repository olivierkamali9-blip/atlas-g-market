import { Router, Request, Response } from 'express';
import { SearchService } from '../services/searchService';

const router = Router();

// Moteur de recherche et filtrage avancé
router.get('/search', async (req: Request, res: Response) => {
  try {
    const {
      q,
      category,
      type,
      condition,
      minPrice,
      maxPrice,
      sortBy,
      sortOrder,
      page,
      limit,
    } = req.query;

    const result = await SearchService.searchListings({
      query: q as string,
      category: category as string,
      type: type as any,
      condition: condition as any,
      minPrice: minPrice ? parseFloat(minPrice as string) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice as string) : undefined,
      sortBy: sortBy as any,
      sortOrder: sortOrder as any,
      page: page ? parseInt(page as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 20,
    });

    res.json(result);
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur lors de la recherche', details: error.message });
  }
});

// Système de mise en relation
router.post('/connect', async (req: Request, res: Response) => {
  try {
    const { listingId, requesterId, message } = req.body;

    if (!listingId || !requesterId) {
      return res.status(400).json({ error: 'listingId et requesterId sont requis.' });
    }

    const connection = await SearchService.createMatchInterest(listingId, requesterId, message);
    res.status(201).json({ success: true, connection });
  } catch (error: any) {
    res.status(500).json({ error: 'Erreur lors de la mise en relation', details: error.message });
  }
});

export default router;