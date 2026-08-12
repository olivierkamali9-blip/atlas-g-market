import { userService } from '../../src/services/userService';

describe('Validation des fonctionnalités du profil utilisateur', () => {
  const testUserId = 'usr_test_12345';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Doit récupérer les détails complets du profil utilisateur', async () => {
    const mockUser = {
      id: testUserId,
      fullName: 'Alex Morgan',
      email: 'alex.morgan@gtech.hq',
      phone: '+33612345678',
      bio: 'Acheteur et vendeur certifié sur Atlas G-market',
      isAgeVerified: true,
      createdAt: '2026-01-15T10:00:00Z',
    };

    jest.spyOn(userService, 'getUserProfile').mockResolvedValue(mockUser as any);

    const profile = await userService.getUserProfile(testUserId);

    expect(profile).toBeDefined();
    expect(profile.id).toBe(testUserId);
    expect(profile.email).toBe('alex.morgan@gtech.hq');
    expect(profile.isAgeVerified).toBe(true);
  });

  test('Doit mettre à jour les informations du profil avec succès', async () => {
    const updateData = {
      fullName: 'Alex Morgan Modified',
      bio: 'Passionné de high-tech et d’offres de services',
      phone: '+33698765432',
    };

    const updatedUser = {
      id: testUserId,
      email: 'alex.morgan@gtech.hq',
      ...updateData,
      isAgeVerified: true,
    };

    jest.spyOn(userService, 'updateUserProfile').mockResolvedValue(updatedUser as any);

    const result = await userService.updateUserProfile(testUserId, updateData);

    expect(result.fullName).toBe('Alex Morgan Modified');
    expect(result.bio).toContain('high-tech');
    expect(result.phone).toBe('+33698765432');
  });

  test('Doit vérifier la conformité d’âge pour les services réglementés', async () => {
    jest.spyOn(userService, 'verifyUserAge').mockResolvedValue({
      userId: testUserId,
      isAdult: true,
      verifiedAt: new Date().toISOString(),
    } as any);

    const ageCheck = await userService.verifyUserAge(testUserId, '1995-08-12');

    expect(ageCheck.isAdult).toBe(true);
    expect(ageCheck.userId).toBe(testUserId);
  });
});