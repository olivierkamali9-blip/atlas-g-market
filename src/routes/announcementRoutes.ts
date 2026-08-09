import express from 'express';
import { createAnnouncement, getAnnouncements, getAnnouncementById } from '../services/announcementService';

const router = express.Router();

router.post('/announcements', createAnnouncement);
router.get('/announcements', getAnnouncements);
router.get('/announcements/:id', getAnnouncementById);

export default router;