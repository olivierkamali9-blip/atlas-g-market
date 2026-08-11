import { Request, Response, NextFunction } from 'express';
import { AuditLogService } from '../services/auditLogService';

const auditLogService = new AuditLogService();

export const auditLog = (actionType: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const originalSend = res.send;
            res.send = function (body: any) {
                auditLogService.logAction(actionType, req.user?.id || 'anonymous', {
                    ip: req.ip,
                    userAgent: req.headers['user-agent'],
                    body: body
                });
                originalSend.call(this, body);
            };
            next();
        } catch (error) {
            console.error('Erreur dans auditLog middleware:', error);
            next();
        }
    };
};