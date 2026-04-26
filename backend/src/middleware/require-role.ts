import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './require-auth';
import { ApiError } from '../utils/api-error';
import { AppRole, hasRequiredRole } from '../utils/role';

export const requireRole = (requiredRole: AppRole) => {
  return (req: AuthenticatedRequest, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(ApiError.unauthorized('Unauthorized'));
      return;
    }

    if (!hasRequiredRole(req.user.role, requiredRole)) {
      next(ApiError.forbidden(`${requiredRole} access required`));
      return;
    }

    next();
  };
};
