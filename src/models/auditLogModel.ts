import mongoose, { Document, Schema } from 'mongoose';

export interface AuditLog extends Document {
    action: string;
    userId?: string;
    targetId?: string;
    metadata?: any;
    timestamp: Date;
}

const AuditLogSchema: Schema = new Schema({
    action: { type: String, required: true },
    userId: { type: String },
    targetId: { type: String },
    metadata: { type: mongoose.Schema.Types.Mixed },
    timestamp: { type: Date, default: Date.now }
});

export const AuditLog = mongoose.model<AuditLog>('AuditLog', AuditLogSchema);