import { claimService } from '../../src/services/claimService';

describe('ClaimService', () => {
  it('devrait créer une réclamation avec le statut PENDING', () => {
    const claim = claimService.createClaim({
      userId: 'user_123',
      type: 'FRAUD',
      subject: 'Paiement suspect hors plateforme',
      description: 'L annonceur demande un virement direct sans passer par le service sécurisé.',
    });

    expect(claim.id).toBeDefined();
    expect(claim.status).toBe('PENDING');
    expect(claim.subject).toBe('Paiement suspect hors plateforme');
  });

  it('devrait mettre à jour le statut d une réclamation', () => {
    const claim = claimService.createClaim({
      userId: 'user_456',
      type: 'AD_SPAM',
      subject: 'Spam récurrent',
      description: 'Même annonce publiée en double.',
    });

    const updated = claimService.updateClaimStatus(claim.id, 'RESOLVED', 'Annonce de doublon supprimée');
    expect(updated?.status).toBe('RESOLVED');
    expect(updated?.adminNotes).toBe('Annonce de doublon supprimée');
  });
});