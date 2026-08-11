import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { AuditLogService } from '../services/auditLogService';

export class UserController {
    private userService: UserService;
    private auditLogService: AuditLogService;

    constructor() {
        this.userService = new UserService();
        this.auditLogService = new AuditLogService();
    }

    async getUserProfile(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const user = await this.userService.getUserById(userId);

            if (!user) {
                return res.status(404).json({ error: 'Utilisateur non trouvé' });
            }

            // Masquer les données sensibles
            const { password, ...userData } = user;
            return res.status(200).json(userData);
        } catch (error) {
            return res.status(500).json({ error: 'Erreur serveur lors de la récupération du profil' });
        }
    }

    async updateUserProfile(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const updates = req.body;

            // Vérification des permissions
            if (req.user.id !== userId && !req.user.roles.includes('admin')) {
                return res.status(403).json({ error: 'Accès refusé' });
            }

            const updatedUser = await this.userService.updateUser(userId, updates);
            await this.auditLogService.logAction('UPDATE_USER_PROFILE', req.user.id, { userId, updates });

            return res.status(200).json(updatedUser);
        } catch (error) {
            return res.status(500).json({ error: 'Erreur serveur lors de la mise à jour du profil' });
        }
    }

    async deleteUserProfile(req: Request, res: Response) {
        try {
            const { userId } = req.params;

            // Vérification des permissions
            if (req.user.id !== userId && !req.user.roles.includes('admin')) {
                return res.status(403).json({ error: 'Accès refusé' });
            }

            await this.userService.deleteUser(userId);
            await this.auditLogService.logAction('DELETE_USER_PROFILE', req.user.id, { userId });

            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ error: 'Erreur serveur lors de la suppression du profil' });
        }
    }
}