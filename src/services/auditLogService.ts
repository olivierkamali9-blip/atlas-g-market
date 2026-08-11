import AuditLog from '../models/auditLogModel';

export const logAction = async (actionType: string, userId: string, details: string) => {
  const log = new AuditLog({
    actionType,
    userId,
    details,
    timestamp: new Date(),
  });
  await log.save();
};