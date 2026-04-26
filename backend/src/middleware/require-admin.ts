import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './require-auth';
import { requireRole } from './require-role';

const adminGuard = requireRole('admin');

export const requireAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  adminGuard(req, res, next);
};
