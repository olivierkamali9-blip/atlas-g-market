import { Router } from 'express';
import { AnnouncementController } from '../controllers/announcementController';
import { requireAuth } from '../middlewares/authMiddleware';
import { checkAgeForRestrictedCategories } from '../middlewares/ageVerification';

const router = Router();
const controller = new AnnouncementController();

// Consultation publique des annonces
router.get('/', (req, res) => controller.getAll(req, res));
router.get('/:id', (req, res) => controller.getById(req, res));

// Publication sécurisée : authentification requise + vérification des restrictions par catégorie
router.post('/', requireAuth, checkAgeForRestrictedCategories, (req, res) => controller.create(req, res));

// Modifications et suppressions réservées aux utilisateurs connectés
router.put('/:id', requireAuth, (req, res) => controller.update(req, res));
router.delete('/:id', requireAuth, (req, res) => controller.delete(req, res));

export default router;