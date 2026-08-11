import { Request, Response } from 'express';
import announcementService from '../services/announcementService';
import auditLogService from '../services/auditLogService';

// GET /announcements/:id
export const getAnnouncementById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const announcement = await announcementService.getAnnouncementById(id);
    if (!announcement) {
      return res.status(404).json({ message: 'Annonce non trouvée' });
    }
    res.json(announcement);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// GET /announcements?category=&search=
export const getAllAnnouncements = async (req: Request, res: Response) => {
  try {
    const { category, search } = req.query;
    const announcements = await announcementService.getAllAnnouncements(category as string, search as string);
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// PUT /announcements/:id
export const updateAnnouncement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const updatedAnnouncement = await announcementService.updateAnnouncement(id, updatedData);

    // Log de l'audit
    await auditLogService.logAction(
      'UPDATE_ANNOUNCEMENT',
      req.user?.id || 'anonymous',
      `Annonce ${id} modifiée`
    );

    res.json(updatedAnnouncement);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// DELETE /announcements/:id
export const deleteAnnouncement = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await announcementService.deleteAnnouncement(id);

    // Log de l'audit
    await auditLogService.logAction(
      'DELETE_ANNOUNCEMENT',
      req.user?.id || 'anonymous',
      `Annonce ${id} supprimée`
    );

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression" });
  }
};