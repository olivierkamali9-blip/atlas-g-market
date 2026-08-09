import express from 'express';
import { searchAnnouncements } from '../services/searchService';

const router = express.Router();

router.get('/search', searchAnnouncements);

export default router;