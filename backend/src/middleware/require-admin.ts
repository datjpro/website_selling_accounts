import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './require-auth';
import { ApiError } from '../utils/api-error';

export const requireAdmin = (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): void => {
  if (!req.user) {
    next(ApiError.unauthorized('Unauthorized'));
    return;
  }

  if (req.user.role !== 'admin') {
    next(ApiError.forbidden('Admin access required'));
    return;
  }

  next();
};
