import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UserService {
    async getUserById(userId: string) {
        return await prisma.user.findUnique({
            where: { id: userId },
            include: {
                preferences: true,
                announcements: {
                    include: {
                        moderationStatus: true,
                        reports: true
                    }
                }
            }
        });
    }

    async updateUser(userId: string, data: any) {
        return await prisma.user.update({
            where: { id: userId },
            data,
            include: {
                preferences: true
            }
        });
    }

    async deleteUser(userId: string) {
        return await prisma.user.delete({
            where: { id: userId }
        });
    }
}