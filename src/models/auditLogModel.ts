import mongoose, { Schema, Document } from 'mongoose';

export interface IAuditLog extends Document {
  actionType: string;
  userId: string;
  details: string;
  timestamp: Date;
}

const AuditLogSchema: Schema = new Schema({
  actionType: { type: String, required: true },
  userId: { type: String, required: true },
  details: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);