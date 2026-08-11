import { Request, Response } from 'express';
import { AnnouncementService } from '../services/announcementService';
import { AuditLogService } from '../services/auditLogService';

export class AnnouncementController {
    private announcementService: AnnouncementService;
    private auditLogService: AuditLogService;

    constructor() {
        this.announcementService = new AnnouncementService();
        this.auditLogService = new AuditLogService();
    }

    async getAnnouncements(req: Request, res: Response) {
        try {
            const announcements = await this.announcementService.getAllAnnouncements();
            res.status(200).json(announcements);
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la récupération des annonces' });
        }
    }

    async getAnnouncementById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const announcement = await this.announcementService.getAnnouncementById(id);

            if (!announcement) {
                return res.status(404).json({ message: 'Annonce non trouvée' });
            }

            res.status(200).json(announcement);
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la récupération de l\'annonce' });
        }
    }

    async updateAnnouncement(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const userId = req.user?.id;
            const updateData = req.body;

            const result = await this.announcementService.updateAnnouncement(id, userId, updateData);

            if (!result.success) {
                return res.status(403).json({ message: result.message });
            }

            await this.auditLogService.createLog({
                action: 'UPDATE_ANNOUNCEMENT',
                userId: userId,
                targetId: id,
                metadata: { changes: updateData }
            });

            res.status(200).json(result.announcement);
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'annonce' });
        }
    }

    async deleteAnnouncement(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const userId = req.user?.id;

            const result = await this.announcementService.deleteAnnouncement(id, userId);

            if (!result.success) {
                return res.status(403).json({ message: result.message });
            }

            await this.auditLogService.createLog({
                action: 'DELETE_ANNOUNCEMENT',
                userId: userId,
                targetId: id
            });

            res.status(200).json({ message: 'Annonce supprimée avec succès' });
        } catch (error) {
            res.status(500).json({ message: 'Erreur lors de la suppression de l\'annonce' });
        }
    }
}

export const announcementController = new AnnouncementController();