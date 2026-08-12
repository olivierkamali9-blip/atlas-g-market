import { describe, it, expect, beforeEach } from 'vitest';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  bio?: string;
  avatarUrl?: string;
  isAgeVerified: boolean;
  accountType: 'individual' | 'pro';
  companyName?: string;
  siret?: string;
  ratingAverage: number;
  ratingCount: number;
  createdAt: string;
}

export class ProfileValidationService {
  public validateUpdate(payload: Partial<UserProfile>): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (payload.fullName !== undefined && payload.fullName.trim().length < 2) {
      errors.push('Le nom complet doit contenir au moins 2 caractères.');
    }

    if (payload.email !== undefined && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      errors.push('Format d\'adresse email invalide.');
    }

    if (payload.phone !== undefined && payload.phone !== '' && !/^\+?[0-9\s\-]{8,15}$/.test(payload.phone)) {
      errors.push('Numéro de téléphone invalide.');
    }

    if (payload.accountType === 'pro') {
      if (!payload.companyName || payload.companyName.trim().length === 0) {
        errors.push('Le nom de l\'entreprise est obligatoire pour un compte professionnel.');
      }
      if (!payload.siret || !/^[0-9]{14}$/.test(payload.siret.replace(/\s/g, ''))) {
        errors.push('Un numéro SIRET valide à 14 chiffres est requis pour un compte pro.');
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  public calculateTrustBadge(profile: UserProfile): string[] {
    const badges: string[] = [];
    if (profile.isAgeVerified) badges.push('Âge Vérifié');
    if (profile.ratingCount >= 5 && profile.ratingAverage >= 4.5) badges.push('Vendeur de Confiance');
    if (profile.accountType === 'pro' && profile.siret) badges.push('Entreprise Vérifiée');
    return badges;
  }
}

describe('Validation des Profils Utilisateurs - Atlas G-market', () => {
  let service: ProfileValidationService;

  beforeEach(() => {
    service = new ProfileValidationService();
  });

  it('devrait valider la mise à jour d’un profil individuel valide', () => {
    const validProfile: Partial<UserProfile> = {
      fullName: 'Thomas Martin',
      email: 'thomas.martin@example.com',
      phone: '+33612345678',
      bio: 'Passionné de bricolage et matériel high-tech.',
      accountType: 'individual',
    };

    const result = service.validateUpdate(validProfile);
    expect(result.valid).toBe(true);
    expect(result.errors.length).toBe(0);
  });

  it('devrait rejeter un nom trop court ou un email invalide', () => {
    const invalidProfile: Partial<UserProfile> = {
      fullName: 'A',
      email: 'email-invalide',
      accountType: 'individual',
    };

    const result = service.validateUpdate(invalidProfile);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Le nom complet doit contenir au moins 2 caractères.');
    expect(result.errors).toContain('Format d\'adresse email invalide.');
  });

  it('devrait exiger SIRET et Nom d\'entreprise pour les comptes Pros', () => {
    const proProfile: Partial<UserProfile> = {
      fullName: 'Sophie Durand',
      email: 'sophie@pro-gmarket.fr',
      accountType: 'pro',
    };

    const result = service.validateUpdate(proProfile);
    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Le nom de l\'entreprise est obligatoire pour un compte professionnel.');
    expect(result.errors).toContain('Un numéro SIRET valide à 14 chiffres me requis pour un compte pro.');
  });

  it('devrait attribuer correctement les badges de confiance', () => {
    const user: UserProfile = {
      id: 'usr-123',
      email: 'verified@pro.fr',
      fullName: 'Tech SARL',
      isAgeVerified: true,
      accountType: 'pro',
      companyName: 'Tech SARL',
      siret: '12345678901234',
      ratingAverage: 4.8,
      ratingCount: 12,
      createdAt: '2026-01-10T10:00:00Z',
    };

    const badges = service.calculateTrustBadge(user);
    expect(badges).toContain('Âge Vérifié');
    expect(badges).toContain('Vendeur de Confiance');
    expect(badges).toContain('Entreprise Vérifiée');
  });
});