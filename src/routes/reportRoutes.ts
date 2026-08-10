import { Router, Request, Response } from 'express';
import { reportService } from '../services/reportService';

const router = Router();

// POST /api/reports - Signaler une annonce
router.post('/', (req: Request, res: Response) => {
  const { announcementId, reporterUserId, reason, description } = req.body;

  if (!announcementId || !reporterUserId || !reason) {
    return res.status(400).json({
      error: 'Les champs announcementId, reporterUserId et reason sont obligatoires.',
    });
  }

  const validReasons = ['spam', 'fraud', 'inappropriate', 'prohibited_item', 'other'];
  if (!validReasons.includes(reason)) {
    return res.status(400).json({
      error: `Motif invalide. Valeurs autorisées: ${validReasons.join(', ')}`,
    });
  }

  const report = reportService.createReport({
    announcementId,
    reporterUserId,
    reason,
    description,
  });

  const totalReports = reportService.getReportCountForAnnouncement(announcementId);

  return res.status(201).json({
    message: 'Signalement enregistré avec succès.',
    report,
    totalReportsForAnnouncement: totalReports,
  });
});

// GET /api/reports - Récupérer les signalements
router.get('/', (req: Request, res: Response) => {
  const status = req.query.status as any;
  const reports = reportService.getAllReports(status);
  return res.status(200).json({ reports, count: reports.length });
});

// GET /api/reports/:id - Détails d'un signalement
router.get('/:id', (req: Request, res: Response) => {
  const report = reportService.getReportById(req.params.id);
  if (!report) {
    return res.status(404).json({ error: 'Signalement introuvable.' });
  }
  return res.status(200).json({ report });
});

// PATCH /api/reports/:id/status - Mettre à jour le statut
router.patch('/:id/status', (req: Request, res: Response) => {
  const { status } = req.body;
  const validStatuses = ['pending', 'reviewed', 'action_taken', 'dismissed'];

  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({
      error: `Statut invalide. Valeurs autorisées: ${validStatuses.join(', ')}`,
    });
  }

  const updatedReport = reportService.updateReportStatus(req.params.id, status);
  if (!updatedReport) {
    return res.status(404).json({ error: 'Signalement introuvable.' });
  }

  return res.status(200).json({
    message: 'Statut du signalement mis à jour avec succès.',
    report: updatedReport,
  });
});

export default router;