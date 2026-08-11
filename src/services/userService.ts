import { PrismaClient } from '@prisma/client';
import { User } from '../types/user';

const prisma = new PrismaClient();

export class UserService {
  async getUserProfile(userId: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        age: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }

  async updateUserProfile(userId: string, updates: Partial<User>): Promise<User> {
    return await prisma.user.update({
      where: { id: userId },
      data: updates
    });
  }

  async deleteUserProfile(userId: string): Promise<void> {
    await prisma.user.delete({
      where: { id: userId }
    });
  }

  async getUserAnnouncements(userId: string) {
    return await prisma.announcement.findMany({
      where: { userId },
      include: { category: true }
    });
  }

  async getUserModerationHistory(userId: string) {
    return await prisma.moderationLog.findMany({
      where: { userId },
      orderBy: { timestamp: 'desc' }
    });
  }
}