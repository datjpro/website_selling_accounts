import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import { UserRepository } from '../repositories/user-repository';
import { AppRole } from '../utils/role';

const JWT_SECRET: Secret = (process.env.JWT_SECRET || 'shopacc_secret_2024') as Secret;

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: AppRole;
    email: string;
    username: string;
  };
}

export const requireAuth = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, message: 'Unauthorized' });
    return;
  }

  const token = authHeader.replace('Bearer ', '').trim();

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if (!decoded.id || typeof decoded.id !== 'string') {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    const user = await UserRepository.findById(decoded.id);
    if (!user) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    req.user = {
      id: user.id,
      role: user.role,
      email: user.email,
      username: user.username,
    };
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Unauthorized' });
  }
};
