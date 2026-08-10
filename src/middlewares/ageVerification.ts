import { Request, Response, NextFunction } from 'express';

export const ageVerification = (req: Request, res: Response, next: NextFunction) => {
  const birthDate = req.body.birthDate;
  if (!birthDate) {
    return res.status(400).json({ error: 'Birth date is required' });
  }

  const birthDateObj = new Date(birthDate);
  const today = new Date();
  const age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDiff = today.getMonth() - birthDateObj.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
    age--;
  }

  if (age < 18) {
    return res.status(403).json({ error: 'You must be at least 18 years old to access this service' });
  }

  next();
};