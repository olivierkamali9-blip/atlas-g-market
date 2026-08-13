import { Router, Request, Response } from 'express';
import { MessagingService } from '../services/messagingService';
import { authenticateUser } from '../middlewares/authMiddleware';

const router = Router();

// Créer ou obtenir une conversation ciblée sur une annonce spécifique
router.post('/conversations/initiate', authenticateUser, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { announcementId } = req.body;

    if (!announcementId) {
      return res.status(400).json({ error: 'Identifiant de l\'annonce requis' });
    }

    const conversation = await MessagingService.getOrCreateConversation(userId, announcementId);
    return res.status(200).json({ success: true, conversation });
  } catch (error: any) {
    return res.status(400).json({ error: error.message || 'Erreur lors de l\'initialisation de la discussion' });
  }
});

// Récupérer toutes les conversations de l'utilisateur connecté
router.get('/conversations', authenticateUser, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const conversations = await MessagingService.getUserConversations(userId);
    return res.status(200).json({ success: true, conversations });
  } catch (error: any) {
    return res.status(500).json({ error: error.message || 'Erreur lors de la récupération des conversations' });
  }
});

// Obtenir les messages d'une conversation
router.get('/conversations/:id/messages', authenticateUser, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const conversationId = req.params.id;
    const messages = await MessagingService.getMessages(conversationId, userId);
    return res.status(200).json({ success: true, messages });
  } catch (error: any) {
    return res.status(403).json({ error: error.message || 'Erreur lors de la récupération des messages' });
  }
});

// Envoyer un message dans une conversation
router.post('/conversations/:id/messages', authenticateUser, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const conversationId = req.params.id;
    const { content } = req.body;

    const message = await MessagingService.sendMessage(conversationId, userId, content);
    return res.status(201).json({ success: true, message });
  } catch (error: any) {
    return res.status(400).json({ error: error.message || 'Erreur lors de l\'envoi du message' });
  }
});

export default router;