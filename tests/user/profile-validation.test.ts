import { describe, it, expect, beforeEach } from 'vitest';

interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  bio?: string;
  isVerified: boolean;
  privacySettings: {
    showEmail: boolean;
    showPhone: boolean;
  };
  createdAt: string;
}

// Service de vérification de la gestion des profils
class UserProfileTester {
  private profiles: Map<string, UserProfile> = new Map();

  createProfile(profile: UserProfile) {
    if (!profile.email.includes('@')) {
      throw new Error('Format d\'adresse email invalide');
    }
    this.profiles.set(profile.id, profile);
    return profile;
  }

  getProfile(id: string, requesterId?: string) {
    const profile = this.profiles.get(id);
    if (!profile) return null;

    // Filtrage automatique des informations personnelles pour les autres membres
    if (requesterId !== id) {
      return {
        id: profile.id,
        fullName: profile.fullName,
        avatarUrl: profile.avatarUrl,
        bio: profile.bio,
        isVerified: profile.isVerified,
        email: profile.privacySettings.showEmail ? profile.email : undefined,
        phone: profile.privacySettings.showPhone ? profile.phone : undefined,
        createdAt: profile.createdAt,
      };
    }

    return profile;
  }

  updateProfile(id: string, updates: Partial<UserProfile>) {
    const existing = this.profiles.get(id);
    if (!existing) throw new Error('Utilisateur non trouvé');

    if (updates.email && !updates.email.includes('@')) {
      throw new Error('Format d\'adresse email invalide');
    }

    const updated = { ...existing, ...updates };
    this.profiles.set(id, updated);
    return updated;
  }
}

describe('Validation des Fonctionnalités de Profil Utilisateur', () => {
  let tester: UserProfileTester;

  beforeEach(() => {
    tester = new UserProfileTester();
    tester.createProfile({
      id: 'usr_123',
      fullName: 'Alex Dupont',
      email: 'alex.dupont@example.com',
      phone: '+33612345678',
      avatarUrl: 'https://atlas-g-market.vercel.app/avatars/alex.png',
      bio: 'Vendeur occasionnel de matériel électronique et services informatique.',
      isVerified: true,
      privacySettings: {
        showEmail: false,
        showPhone: false,
      },
      createdAt: '2026-08-01T10:00:00Z',
    });
  });

  it('devrait récupérer le profil complet pour le propriétaire', () => {
    const profile = tester.getProfile('usr_123', 'usr_123');
    expect(profile).toBeDefined();
    expect(profile?.email).toBe('alex.dupont@example.com');
    expect(profile?.phone).toBe('+33612345678');
  });

  it('devrait masquer les coordonnées privées pour un tiers', () => {
    const publicProfile = tester.getProfile('usr_123', 'usr_999');
    expect(publicProfile).toBeDefined();
    expect(publicProfile?.email).toBeUndefined();
    expect(publicProfile?.phone).toBeUndefined();
    expect(publicProfile?.fullName).toBe('Alex Dupont');
  });

  it('devrait mettre à jour la biographie et les coordonnées correctement', () => {
    const updated = tester.updateProfile('usr_123', {
      bio: 'Nouvelle description mise à jour.',
      privacySettings: { showEmail: true, showPhone: false },
    });
    expect(updated.bio).toBe('Nouvelle description mise à jour.');
    expect(updated.privacySettings.showEmail).toBe(true);
  });

  it('devrait rejeter une modification avec un email invalide', () => {
    expect(() => {
      tester.updateProfile('usr_123', { email: 'email_invalide' });
    }).toThrow('Format d\'adresse email invalide');
  });
});