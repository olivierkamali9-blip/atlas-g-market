import request from 'supertest';
import app from '../../src/app';
import { reportService } from '../../src/services/reportService';

describe('API Signalements (Reports)', () => {
  beforeEach(() => {
    reportService.clearAll();
  });

  it('devrait enregistrer un nouveau signalement avec succès', async () => {
    const response = await request(app)
      .post('/api/reports')
      .send({
        announcementId: 'ann_123',
        reporterUserId: 'usr_456',
        reason: 'spam',
        description: 'Contenu publicitaire répétitif.',
      });

    expect(response.status).toBe(201);
    expect(response.body.report).toBeDefined();
    expect(response.body.report.reason).toBe('spam');
    expect(response.body.totalReportsForAnnouncement).toBe(1);
  });

  it('devrait refuser un signalement avec une raison invalide', async () => {
    const response = await request(app)
      .post('/api/reports')
      .send({
        announcementId: 'ann_123',
        reporterUserId: 'usr_456',
        reason: 'invalid_reason',
      });

    expect(response.status).toBe(400);
  });

  it('devrait lister les signalements créés', async () => {
    reportService.createReport({
      announcementId: 'ann_1',
      reporterUserId: 'usr_1',
      reason: 'fraud',
    });

    const response = await request(app).get('/api/reports');
    expect(response.status).toBe(200);
    expect(response.body.count).toBe(1);
  });

  it('devrait mettre à jour le statut d\'un signalement', async () => {
    const report = reportService.createReport({
      announcementId: 'ann_2',
      reporterUserId: 'usr_2',
      reason: 'inappropriate',
    });

    const response = await request(app)
      .patch(`/api/reports/${report.id}/status`)
      .send({ status: 'action_taken' });

    expect(response.status).toBe(200);
    expect(response.body.report.status).toBe('action_taken');
  });
});