import mongoose, { Document, Schema } from 'mongoose';

export interface Announcement extends Document {
    title: string;
    description: string;
    category: string;
    price?: number;
    isNegotiable: boolean;
    userId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
    status: 'active' | 'moderated' | 'rejected';
    moderationNotes?: string;
}

const AnnouncementSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number },
    isNegotiable: { type: Boolean, default: false },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['active', 'moderated', 'rejected'], default: 'active' },
    moderationNotes: { type: String }
});

export const Announcement = mongoose.model<Announcement>('Announcement', AnnouncementSchema);