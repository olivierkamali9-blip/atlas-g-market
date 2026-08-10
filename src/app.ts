import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import announcementRoutes from './routes/announcementRoutes';
import searchRoutes from './routes/searchRoutes';
import messagingRoutes from './routes/messagingRoutes';
import marketplaceRoutes from './routes/marketplaceRoutes';
import claimRoutes from './routes/claimRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/announcements', announcementRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/messaging', messagingRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/claims', claimRoutes);

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

export default app;