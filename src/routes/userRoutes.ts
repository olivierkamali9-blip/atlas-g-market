import express from 'express';
import {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  getUserAnnouncements,
  getUserModerationHistory
} from '../controllers/userController';
import { authenticate } from '../middlewares/authMiddleware';
import { auditLog } from '../middlewares/auditMiddleware';

const router = express.Router();

router.get('/profile', authenticate, auditLog('GET_USER_PROFILE'), getUserProfile);
router.put('/profile', authenticate, auditLog('UPDATE_USER_PROFILE'), updateUserProfile);
router.delete('/profile', authenticate, auditLog('DELETE_USER_PROFILE'), deleteUserProfile);
router.get('/profile/announcements', authenticate, auditLog('GET_USER_ANNOUNCEMENTS'), getUserAnnouncements);
router.get('/profile/moderation-history', authenticate, auditLog('GET_USER_MODERATION_HISTORY'), getUserModerationHistory);

export default router;