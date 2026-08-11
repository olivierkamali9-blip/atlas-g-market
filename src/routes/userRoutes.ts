import express from 'express';
import { getUserProfile, updateUserProfile, deleteUserProfile } from '../controllers/userController';
import { authenticate, authorize } from '../middlewares/authMiddleware';
import { auditLog } from '../middlewares/auditMiddleware';

const router = express.Router();

// Routes pour le profil utilisateur
router.get('/profile/:userId', authenticate, authorize(['user', 'admin']), auditLog('GET_USER_PROFILE'), getUserProfile);
router.put('/profile/:userId', authenticate, authorize(['user', 'admin']), auditLog('UPDATE_USER_PROFILE'), updateUserProfile);
router.delete('/profile/:userId', authenticate, authorize(['user', 'admin']), auditLog('DELETE_USER_PROFILE'), deleteUserProfile);

export default router;