import express from 'express';
import { authenticate } from '../middlewares/authMiddleware';
import { authorizeModerator } from '../middlewares/authMiddleware';
import { validateAnnouncement } from '../middlewares/validationMiddleware';
import { getAnnouncements, getAnnouncementById, updateAnnouncement, deleteAnnouncement } from '../controllers/announcementController';
import { auditLog } from '../middlewares/auditMiddleware';

const router = express.Router();

// Routes publiques
router.get('/', getAnnouncements);
router.get('/:id', getAnnouncementById);

// Routes protégées (nécessitent une authentification)
router.put('/:id', authenticate, validateAnnouncement, auditLog('UPDATE_ANNOUNCEMENT'), updateAnnouncement);
router.delete('/:id', authenticate, auditLog('DELETE_ANNOUNCEMENT'), deleteAnnouncement);

export default router;