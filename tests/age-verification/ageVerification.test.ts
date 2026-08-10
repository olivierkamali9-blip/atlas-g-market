import { ageVerification } from '../../src/middlewares/ageVerification';
import { Request, Response, NextFunction } from 'express';

describe('Age Verification Middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should allow access if age is 18 or older', () => {
    req.body = { birthDate: '2000-01-01' };
    ageVerification(req as Request, res as Response, next);
    expect(next).toHaveBeenCalled();
  });

  it('should block access if age is under 18', () => {
    req.body = { birthDate: '2010-01-01' };
    ageVerification(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'You must be at least 18 years old to access this service' });
  });

  it('should return 400 if birth date is missing', () => {
    req.body = {};
    ageVerification(req as Request, res as Response, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Birth date is required' });
  });
});