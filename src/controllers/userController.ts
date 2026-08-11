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
      const userId = req.user.id;
      const user = await this.userService.getUserProfile(userId);
      await this.auditLogService.logAction('GET_USER_PROFILE', userId, { userId });
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ error: 'User not found' });
    }
  }

  async updateUserProfile(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      const updates = req.body;
      const updatedUser = await this.userService.updateUserProfile(userId, updates);
      await this.auditLogService.logAction('UPDATE_USER_PROFILE', userId, { updates });
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: 'Failed to update profile' });
    }
  }

  async deleteUserProfile(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      await this.userService.deleteUserProfile(userId);
      await this.auditLogService.logAction('DELETE_USER_PROFILE', userId, { userId });
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: 'Failed to delete profile' });
    }
  }

  async getUserAnnouncements(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      const announcements = await this.userService.getUserAnnouncements(userId);
      await this.auditLogService.logAction('GET_USER_ANNOUNCEMENTS', userId, { userId });
      res.status(200).json(announcements);
    } catch (error) {
      res.status(404).json({ error: 'No announcements found' });
    }
  }

  async getUserModerationHistory(req: Request, res: Response) {
    try {
      const userId = req.user.id;
      const history = await this.userService.getUserModerationHistory(userId);
      await this.auditLogService.logAction('GET_USER_MODERATION_HISTORY', userId, { userId });
      res.status(200).json(history);
    } catch (error) {
      res.status(404).json({ error: 'No moderation history found' });
    }
  }
}