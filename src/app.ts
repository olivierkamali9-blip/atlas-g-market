import express from 'express';
import cors from 'cors';
import announcementRoutes from './routes/announcementRoutes';
import searchRoutes from './routes/searchRoutes';
import messagingRoutes from './routes/messagingRoutes';
import claimRoutes from './routes/claimRoutes';
import userRoutes from './routes/userRoutes';
import marketplaceRoutes from './routes/marketplaceRoutes';
import reportRoutes from './routes/reportRoutes';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.use('/api/announcements', announcementRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/messages', messagingRoutes);
app.use('/api/claims', claimRoutes);
app.use('/api/users', userRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/reports', reportRoutes);

export default app;