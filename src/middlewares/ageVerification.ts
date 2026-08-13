import { Request, Response, NextFunction } from 'express';

// Catégories nécessitant une vérification de la majorité (18+)
export const ADULT_RESTRICTED_CATEGORIES = [
  'adult_products',
  'alcohol_tobacco',
  'services_18plus',
  'jobs_sensitive'
];

export const checkAgeForRestrictedCategories = (req: Request, res: Response, next: NextFunction) => {
  const { category } = req.body;
  const user = (req as any).user;

  if (!user) {
    return res.status(401).json({
      error: 'Accès refusé. Vous devez être connecté pour publier une annonce sur Atlas G-market.'
    });
  }

  if (category && ADULT_RESTRICTED_CATEGORIES.includes(category)) {
    const isAdult = user.isAdult || (user.age && user.age >= 18);
    if (!isAdult) {
      return res.status(403).json({
        error: 'Cette catégorie exige la majorité légale (18 ans et plus).'
      });
    }
  }

  next();
};