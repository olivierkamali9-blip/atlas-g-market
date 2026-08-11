import express from 'express';
import {
  getAnnouncementById,
  getAllAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
} from '../controllers/announcementController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { auditMiddleware } from '../middlewares/auditMiddleware';

const router = express.Router();

router.get('/:id', getAnnouncementById);
router.get('/', getAllAnnouncements);
router.put('/:id', authMiddleware, updateAnnouncement);
router.delete('/:id', authMiddleware, deleteAnnouncement);

export default router;