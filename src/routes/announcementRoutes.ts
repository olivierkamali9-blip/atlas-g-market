import express, { Request, Response } from 'express';
import { announcementService } from '../services/announcementService';

const router = express.Router();

router.post('/annonces', async (req: Request, res: Response) => {
  try {
    const announcement = await announcementService.createAnnouncement(req.body);
    res.status(201).json(announcement);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la création de l\'annonce' });
  }
});

router.get('/annonces', async (req: Request, res: Response) => {
  try {
    const announcements = await announcementService.getAnnouncements();
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des annonces' });
  }
});

export default router;