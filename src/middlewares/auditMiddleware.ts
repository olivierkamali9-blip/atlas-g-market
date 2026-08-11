import { Request, Response, NextFunction } from 'express';
import { AuditLogService } from '../services/auditLogService';

const auditLogService = new AuditLogService();

export const auditLog = (action: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user?.id;
            const targetId = req.params.id;

            await auditLogService.createLog({
                action,
                userId,
                targetId,
                metadata: {
                    ip: req.ip,
                    userAgent: req.get('User-Agent'),
                    path: req.path,
                    method: req.method
                }
            });
        } catch (error) {
            console.error('Erreur lors de la création du log d\'audit:', error);
        }
        next();
    };
};