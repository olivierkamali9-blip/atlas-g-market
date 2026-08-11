import { AuditLog } from '../models/auditLogModel';

export interface AuditLogData {
    action: string;
    userId?: string;
    targetId?: string;
    metadata?: any;
}

export class AuditLogService {
    async createLog(logData: AuditLogData) {
        const log = new AuditLog({
            action: logData.action,
            userId: logData.userId,
            targetId: logData.targetId,
            metadata: logData.metadata,
            timestamp: new Date()
        });

        await log.save();
        return log;
    }

    async getLogsByUser(userId: string) {
        return AuditLog.find({ userId }).sort({ timestamp: -1 });
    }

    async getLogsByAction(action: string) {
        return AuditLog.find({ action }).sort({ timestamp: -1 });
    }
}