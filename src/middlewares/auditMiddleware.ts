import { Request, Response, NextFunction } from 'express';
import auditLogService from '../services/auditLogService';

export const auditMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const originalSend = res.send;
  res.send = function (body: any) {
    if (res.statusCode >= 400) {
      auditLogService.logAction(
        'API_ERROR',
        req.user?.id || 'anonymous',
        `Erreur ${res.statusCode} sur ${req.method} ${req.path}`
      );
    }
    originalSend.call(this, body);
  };
  next();
};