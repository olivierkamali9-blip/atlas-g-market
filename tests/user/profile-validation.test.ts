import { describe, it, expect, beforeEach } from 'vitest';
import { userService } from '../../src/services/userService';

describe('Validation des fonctionnalités de Profil Utilisateur', () => {
  beforeEach(() => {
    // Réinitialisation de l'état simulé des utilisateurs avant chaque test
    userService.clearMockUsers?.();
  });

  it('doit valider la création et la lecture d un profil complet', async () => {
    const newUser = await userService.createUser({
      email: 'jean.dupont@example.com',
      name: 'Jean Dupont',
      phone: '+33612345678',
      role: 'user',
      isAgeVerified: true,
    });

    expect(newUser).toBeDefined();
    expect(newUser.id).toBeDefined();
    expect(newUser.email).toBe('jean.dupont@example.com');
    expect(newUser.isAgeVerified).toBe(true);
  });

  it('doit autoriser la mise à jour des informations de profil (bio, téléphone, avatar)', async () => {
    const user = await userService.createUser({
      email: 'marie.curie@example.com',
      name: 'Marie Curie',
      phone: '+33600000000',
    });

    const updated = await userService.updateProfile(user.id, {
      bio: 'Passionnée de micro-services et d opportunités d emploi local.',
      phone: '+33699887766',
      avatarUrl: 'https://atlas-g-market.vercel.app/avatars/marie.png',
      location: 'Paris, France',
    });

    expect(updated.bio).toContain('micro-services');
    expect(updated.phone).toBe('+33699887766');
    expect(updated.location).toBe('Paris, France');
  });

  it('doit rejeter un format de téléphone invalide dans le profil', async () => {
    const user = await userService.createUser({
      email: 'test.invalid@example.com',
      name: 'Testeur Format',
    });

    await expect(
      userService.updateProfile(user.id, { phone: 'numero-invalide-123' })
    ).rejects.toThrow();
  });

  it('doit enregistrer et valider les préférences de notification du profil', async () => {
    const user = await userService.createUser({
      email: 'alex.dev@example.com',
      name: 'Alex Dev',
    });

    const preferences = await userService.updatePreferences(user.id, {
      emailNotifications: true,
      pushNotifications: false,
      preferredCategories: ['Emploi', 'Services', 'Électronique'],
    });

    expect(preferences.emailNotifications).toBe(true);
    expect(preferences.preferredCategories).toContain('Emploi');
  });
});