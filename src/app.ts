import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import announcementRoutes from './routes/announcementRoutes';
import searchRoutes from './routes/searchRoutes';
import messagingRoutes from './routes/messagingRoutes';

const app: Express = express();

// Middlewares globaux
app.use(helmet());
app.use(cors());
app.use(express.json());

// Healthcheck
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

// Enregistrement des API
app.use('/api/announcements', announcementRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/messages', messagingRoutes);

// Gestionnaire de routes non trouvées
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route non trouvée' });
});

// Middleware d'erreur global
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('[Error Handler]:', err.message);
  res.status(500).json({
    error: 'Erreur interne du serveur',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

export default app;