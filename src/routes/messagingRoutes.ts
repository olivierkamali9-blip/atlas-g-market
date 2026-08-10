import express, { Request, Response } from 'express';
import { messagingService } from '../services/messagingService';

const router = express.Router();

router.post('/messages', async (req: Request, res: Response) => {
  try {
    const message = await messagingService.createMessage(req.body);
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création du message' });
  }
});

router.get('/messages', async (req: Request, res: Response) => {
  try {
    const messages = await messagingService.getMessages();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des messages' });
  }
});

export default router;