import { Router, Request, Response } from 'express';
import { RatingService } from '../services/ratingService';

const router = Router();

// Endpoint pour lire les avis d'un vendeur
router.get('/sellers/:sellerId/reviews', async (req: Request, res: Response) => {
  try {
    const { sellerId } = req.params;
    const reviews = await RatingService.getSellerReviews(sellerId);
    const summary = await RatingService.getSellerSummary(sellerId);

    res.status(200).json({
      success: true,
      data: {
        summary,
        reviews,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Endpoint pour poster un avis sur un vendeur
router.post('/sellers/:sellerId/reviews', async (req: Request, res: Response) => {
  try {
    const { sellerId } = req.params;
    const { authorId, authorName, rating, comment } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({ success: false, message: 'La note et le commentaire sont requis.' });
    }

    const newReview = await RatingService.addReview(
      sellerId,
      authorId || 'anon-user',
      authorName || 'Membre Atlas',
      Number(rating),
      comment
    );

    res.status(201).json({
      success: true,
      data: newReview,
    });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;