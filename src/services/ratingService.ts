import { neonPool } from '../config/neonDatabase';

export interface SellerReview {
  id: string;
  sellerId: string;
  authorId: string;
  authorName: string;
  rating: number; // 1 à 5
  comment: string;
  createdAt: Date;
}

export interface SellerRatingSummary {
  sellerId: string;
  averageRating: number;
  totalReviews: number;
  ratingDistribution: Record<number, number>;
}

export class RatingService {
  private static reviewsInMemory: SellerReview[] = [
    {
      id: 'rev-1',
      sellerId: 'user-seller-1',
      authorId: 'user-buyer-1',
      authorName: 'Marc D.',
      rating: 5,
      comment: 'Vendeur très réactif, produit conforme et expédié dans la journée !',
      createdAt: new Date('2026-08-10T14:30:00Z'),
    },
    {
      id: 'rev-2',
      sellerId: 'user-seller-1',
      authorId: 'user-buyer-2',
      authorName: 'Sophie L.',
      rating: 4,
      comment: 'Très bonne communication. Article en très bon état.',
      createdAt: new Date('2026-08-11T09:15:00Z'),
    },
  ];

  static async addReview(
    sellerId: string,
    authorId: string,
    authorName: string,
    rating: number,
    comment: string
  ): Promise<SellerReview> {
    if (rating < 1 || rating > 5) {
      throw new Error('La note doit être comprise entre 1 et 5 étoiles.');
    }
    if (!comment || comment.trim().length < 3) {
      throw new Error('Le commentaire doit contenir au moins 3 caractères.');
    }

    const review: SellerReview = {
      id: `rev-${Date.now()}`,
      sellerId,
      authorId,
      authorName: authorName || 'Utilisateur anonyme',
      rating,
      comment: comment.trim(),
      createdAt: new Date(),
    };

    if (neonPool) {
      try {
        await neonPool.query(
          `INSERT INTO seller_reviews (id, seller_id, author_id, author_name, rating, comment, created_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [review.id, review.sellerId, review.authorId, review.authorName, review.rating, review.comment, review.createdAt]
        );
      } catch (err) {
        console.warn('Neon DB fallback mémoire pour les évaluations:', err);
        this.reviewsInMemory.push(review);
      }
    } else {
      this.reviewsInMemory.push(review);
    }

    return review;
  }

  static async getSellerReviews(sellerId: string): Promise<SellerReview[]> {
    if (neonPool) {
      try {
        const res = await neonPool.query(
          `SELECT id, seller_id as "sellerId", author_id as "authorId", author_name as "authorName", rating, comment, created_at as "createdAt"
           FROM seller_reviews WHERE seller_id = $1 ORDER BY created_at DESC`,
          [sellerId]
        );
        return res.rows;
      } catch {
        // Fallback en mémoire
      }
    }
    return this.reviewsInMemory.filter((r) => r.sellerId === sellerId);
  }

  static async getSellerSummary(sellerId: string): Promise<SellerRatingSummary> {
    const reviews = await this.getSellerReviews(sellerId);
    if (reviews.length === 0) {
      return {
        sellerId,
        averageRating: 0,
        totalReviews: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      };
    }

    const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let sum = 0;

    for (const r of reviews) {
      sum += r.rating;
      if (distribution[r.rating] !== undefined) {
        distribution[r.rating]++;
      }
    }

    return {
      sellerId,
      averageRating: Math.round((sum / reviews.length) * 10) / 10,
      totalReviews: reviews.length,
      ratingDistribution: distribution,
    };
  }
}