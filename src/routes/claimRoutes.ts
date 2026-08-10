import { Router, Request, Response } from 'express';
import { claimService } from '../services/claimService';

const router = Router();

router.post('/', (req: Request, res: Response) => {
  const { userId, targetId, type, subject, description } = req.body;

  if (!userId || !type || !subject || !description) {
    return res.status(400).json({ error: 'Les champs userId, type, subject et description sont requis.' });
  }

  const validTypes = ['AD_SPAM', 'FRAUD', 'NON_COMPLIANT', 'USER_BEHAVIOR', 'OTHER'];
  if (!validTypes.includes(type)) {
    return res.status(400).json({ error: 'Type de réclamation invalide.' });
  }

  const claim = claimService.createClaim({ userId, targetId, type, subject, description });
  return res.status(201).json(claim);
});

router.get('/user/:userId', (req: Request, res: Response) => {
  const { userId } = req.params;
  const claims = claimService.getClaimsByUser(userId);
  return res.json(claims);
});

router.get('/', (_req: Request, res: Response) => {
  const claims = claimService.getAllClaims();
  return res.json(claims);
});

router.patch('/:id/status', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, adminNotes } = req.body;

  const validStatuses = ['PENDING', 'IN_PROGRESS', 'RESOLVED', 'REJECTED'];
  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Statut de réclamation invalide.' });
  }

  const updatedClaim = claimService.updateClaimStatus(id, status, adminNotes);
  if (!updatedClaim) {
    return res.status(404).json({ error: 'Réclamation non trouvée.' });
  }

  return res.json(updatedClaim);
});

export default router;