import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AuditLogService {
    async logAction(actionType: string, userId: string, metadata: any) {
        return await prisma.auditLog.create({
            data: {
                actionType,
                userId,
                metadata: metadata,
                timestamp: new Date()
            }
        });
    }

    async getAuditLogs(userId?: string, actionType?: string) {
        return await prisma.auditLog.findMany({
            where: {
                userId,
                actionType
            },
            orderBy: {
                timestamp: 'desc'
            }
        });
    }
}