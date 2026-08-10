export interface Claim {
  id: string;
  userId: string;
  targetId?: string;
  type: 'AD_SPAM' | 'FRAUD' | 'NON_COMPLIANT' | 'USER_BEHAVIOR' | 'OTHER';
  subject: string;
  description: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'RESOLVED' | 'REJECTED';
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

class ClaimService {
  private claims: Map<string, Claim> = new Map();

  createClaim(data: Omit<Claim, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Claim {
    const id = `claim_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const newClaim: Claim = {
      ...data,
      id,
      status: 'PENDING',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.claims.set(id, newClaim);
    return newClaim;
  }

  getClaimById(id: string): Claim | undefined {
    return this.claims.get(id);
  }

  getClaimsByUser(userId: string): Claim[] {
    return Array.from(this.claims.values()).filter((claim) => claim.userId === userId);
  }

  getAllClaims(): Claim[] {
    return Array.from(this.claims.values());
  }

  updateClaimStatus(id: string, status: Claim['status'], adminNotes?: string): Claim | null {
    const claim = this.claims.get(id);
    if (!claim) return null;

    claim.status = status;
    if (adminNotes !== undefined) {
      claim.adminNotes = adminNotes;
    }
    claim.updatedAt = new Date();
    this.claims.set(id, claim);
    return claim;
  }
}

export const claimService = new ClaimService();