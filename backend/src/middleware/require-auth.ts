import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const JWT_SECRET: Secret = (process.env.JWT_SECRET || 'shopacc_secret_2024') as Secret;

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
  };
}

export const requireAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const token = authHeader.replace('Bearer ', '').trim();

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if (!decoded.id || typeof decoded.id !== 'string') {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    req.user = { id: decoded.id };
    next();
  } catch {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
