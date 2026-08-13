import { RatingService } from '../../src/services/ratingService';

describe('RatingService - Système de notation des vendeurs', () => {
  it('devrait ajouter un avis valide pour un vendeur', async () => {
    const review = await RatingService.addReview(
      'user-seller-test',
      'user-buyer-100',
      'Camille P.',
      5,
      'Excellente transaction, rapide et sérieux !'
    );

    expect(review).toBeDefined();
    expect(review.rating).toBe(5);
    expect(review.authorName).toBe('Camille P.');
  });

  it('devrait refuser une note invalide (supérieure à 5)', async () => {
    await expect(
      RatingService.addReview('user-seller-test', 'user-buyer-100', 'Test', 6, 'Super')
    ).rejects.toThrow('La note doit être comprise entre 1 et 5 étoiles.');
  });

  it('devrait calculer la moyenne correcte des notes d\'un vendeur', async () => {
    const summary = await RatingService.getSellerSummary('user-seller-test');
    expect(summary).toBeDefined();
    expect(summary.totalReviews).toBeGreaterThanOrEqual(1);
    expect(summary.averageRating).toBeGreaterThanOrEqual(1);
    expect(summary.averageRating).toBeLessThanOrEqual(5);
  });
});