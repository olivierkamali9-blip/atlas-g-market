import { Announcement } from '../models/announcementModel';

export class AnnouncementService {
    async getAllAnnouncements(): Promise<Announcement[]> {
        // Logique pour récupérer toutes les annonces (publiques)
        return Announcement.find({});
    }

    async getAnnouncementById(id: string): Promise<Announcement | null> {
        // Logique pour récupérer une annonce par ID
        return Announcement.findById(id);
    }

    async updateAnnouncement(id: string, userId: string, updateData: Partial<Announcement>): Promise<{ success: boolean; message?: string; announcement?: Announcement }> {
        const announcement = await Announcement.findById(id);

        if (!announcement) {
            return { success: false, message: 'Annonce non trouvée' };
        }

        // Vérifier que l'utilisateur est le propriétaire de l'annonce
        if (announcement.userId.toString() !== userId) {
            return { success: false, message: 'Vous n\'êtes pas autorisé à modifier cette annonce' };
        }

        // Mettre à jour l'annonce
        const updatedAnnouncement = await Announcement.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        return { success: true, announcement: updatedAnnouncement };
    }

    async deleteAnnouncement(id: string, userId: string): Promise<{ success: boolean; message?: string }> {
        const announcement = await Announcement.findById(id);

        if (!announcement) {
            return { success: false, message: 'Annonce non trouvée' };
        }

        // Vérifier que l'utilisateur est le propriétaire de l'annonce
        if (announcement.userId.toString() !== userId) {
            return { success: false, message: 'Vous n\'êtes pas autorisé à supprimer cette annonce' };
        }

        await Announcement.findByIdAndDelete(id);
        return { success: true };
    }
}