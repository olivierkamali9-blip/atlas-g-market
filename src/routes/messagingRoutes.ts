import express from 'express';
import { createMessage, getConversation } from '../services/messagingService';

const router = express.Router();

router.post('/messages', createMessage);
router.get('/conversations/:id', getConversation);

export default router;