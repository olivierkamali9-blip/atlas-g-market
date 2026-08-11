import request from 'supertest';
import app from '../../src/app';

describe('Suite de tests - Modération et Signalement (Atlas G-market)', () => {
  let userToken: string;
  let moderatorToken: string;
  let testAdId: string;
  let testReportId: string;

  beforeAll(async () => {
    // Jetons simulés pour un utilisateur classique et un modérateur
    userToken = 'Bearer mock-user-token-123';
    moderatorToken = 'Bearer mock-moderator-token-999';
    testAdId = 'ad-uuid-4567-89ab';
  });

  describe('POST /api/reports - Signalement d\'une annonce', () => {
    it('devrait permettre à un utilisateur authentifié de signaler une annonce suspecte', async () => {
      const response = await request(app)
        .post('/api/reports')
        .set('Authorization', userToken)
        .send({
          announcementId: testAdId,
          reason: 'SCAM',
          description: 'Vendeur demande un acompte hors plateforme par coupon.',
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.status).toBe('PENDING');
      expect(response.body.reason).toBe('SCAM');
      
      testReportId = response.body.id;
    });

    it('devrait rejeter un signalement avec une raison invalide', async () => {
      const response = await request(app)
        .post('/api/reports')
        .set('Authorization', userToken)
        .send({
          announcementId: testAdId,
          reason: 'INVALID_REASON',
          description: 'Test invalide',
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBeDefined();
    });

    it('devrait bloquer les doublons de signalement par un même utilisateur pour la même annonce', async () => {
      const response = await request(app)
        .post('/api/reports')
        .set('Authorization', userToken)
        .send({
          announcementId: testAdId,
          reason: 'SCAM',
          description: 'Deuxième signalement identique.',
        });

      expect(response.status).toBe(409);
      expect(response.body.message).toMatch(/déjà signalé/i);
    });
  });

  describe('GET /api/moderation/reports - Consultation des signalements', () => {
    it('devrait refuser l\'accès à la liste des signalements pour un utilisateur non modérateur', async () => {
      const response = await request(app)
        .get('/api/moderation/reports')
        .set('Authorization', userToken);

      expect(response.status).toBe(403);
    });

    it('devrait permettre au modérateur de consulter les signalements en attente', async () => {
      const response = await request(app)
        .get('/api/moderation/reports?status=PENDING')
        .set('Authorization', moderatorToken);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.some((report: any) => report.id === testReportId)).toBe(true);
    });
  });

  describe('PATCH /api/moderation/reports/:id/resolve - Traitement d\'un signalement', () => {
    it('devrait valider le signalement et masquer l\'annonce incriminée', async () => {
      const response = await request(app)
        .patch(`/api/moderation/reports/${testReportId}/resolve`)
        .set('Authorization', moderatorToken)
        .send({
          action: 'APPROVE_AND_SUSPEND_AD',
          notes: 'Annonce confirmée frauduleuse suite à examen.',
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('RESOLVED');
      expect(response.body.actionTaken).toBe('APPROVE_AND_SUSPEND_AD');
    });

    it('devrait retourner une erreur 404 lors du traitement d\'un signalement inexistant', async () => {
      const response = await request(app)
        .patch('/api/moderation/reports/non-existent-report-id/resolve')
        .set('Authorization', moderatorToken)
        .send({
          action: 'REJECT',
          notes: 'Signalement non trouvé',
        });

      expect(response.status).toBe(404);
    });
  });
});