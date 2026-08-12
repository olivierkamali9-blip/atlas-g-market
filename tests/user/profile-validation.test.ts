import { describe, it, expect, beforeEach } from 'vitest';
import { validateUserProfile, updateUserPreferences, checkUserAgeCompliance } from '../../src/services/userService';

describe('Validation des fonctionnalités de profil utilisateur - Atlas G-market', () => {
  let mockUserProfile: {
    id: string;
    email: string;
    fullName: string;
    birthDate: string;
    phone: string;
    isVerified: boolean;
    preferences: {
      notificationsEnabled: boolean;
      dataSharingConsent: boolean;
      preferredLanguage: string;
    };
  };

  beforeEach(() => {
    mockUserProfile = {
      id: 'usr_12345',
      email: 'jean.dupont@example.com',
      fullName: 'Jean Dupont',
      birthDate: '1990-05-15',
      phone: '+33612345678',
      isVerified: true,
      preferences: {
        notificationsEnabled: true,
        dataSharingConsent: true,
        preferredLanguage: 'fr',
      },
    };
  });

  it('devrait valider correctement un profil utilisateur complet et conforme', () => {
    const result = validateUserProfile(mockUserProfile);
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('devrait rejeter un profil avec un email invalide ou un nom vide', () => {
    const invalidProfile = { ...mockUserProfile, email: 'email-invalide', fullName: '' };
    const result = validateUserProfile(invalidProfile);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Email invalide');
    expect(result.errors).toContain('Le nom complet est requis');
  });

  it('devrait vérifier le respect de la majorité légale (18 ans et plus)', () => {
    const adultUser = checkUserAgeCompliance('2000-01-01');
    const minorUser = checkUserAgeCompliance('2012-06-20');

    expect(adultUser.isEligible).toBe(true);
    expect(minorUser.isEligible).toBe(false);
    expect(minorUser.reason).toContain('L\'utilisateur doit avoir au moins 18 ans');
  });

  it('devrait mettre à jour les préférences de confidentialité et de notification sans altérer les autres données', () => {
    const updated = updateUserPreferences(mockUserProfile.id, {
      notificationsEnabled: false,
      dataSharingConsent: false,
    });

    expect(updated.preferences.notificationsEnabled).toBe(false);
    expect(updated.preferences.dataSharingConsent).toBe(false);
    expect(updated.preferences.preferredLanguage).toBe('fr');
  });
});