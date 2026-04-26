import { Request, Response } from 'express';
import { AuthService } from '../services/auth-service';
import { AuthenticatedRequest } from '../middleware/require-auth';
import { LoginCredentials, RegisterData, UserResponse } from '../types/auth';

export class AuthController {
  static async login(req: Request, res: Response): Promise<void> {
    try {
      const payload = req.body as LoginCredentials;
      if (!payload.email || !payload.password) {
        res.status(400).json({ error: 'Email and password are required' });
        return;
      }

      const result = await AuthService.login(payload);
      res.json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      const status = message === 'Invalid email or password' || message.startsWith('User account is') ? 401 : 500;
      res.status(status).json({ error: message });
    }
  }

  static async register(req: Request, res: Response): Promise<void> {
    try {
      const payload = req.body as RegisterData;
      if (!payload.username || !payload.email || !payload.password) {
        res.status(400).json({ error: 'Username, email and password are required' });
        return;
      }

      const result = await AuthService.register(payload);
      res.status(201).json(result);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Register failed';
      const status = message === 'Email already registered' ? 409 : 500;
      res.status(status).json({ error: message });
    }
  }

  static async logout(_req: Request, res: Response): Promise<void> {
    res.status(204).send();
  }

  static async me(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user?.id) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const user = await AuthService.getMe(req.user.id);
      res.json(user);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load profile';
      res.status(message === 'User not found' ? 404 : 500).json({ error: message });
    }
  }

  static async updateProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user?.id) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const payload = req.body as Partial<UserResponse>;
      const user = await AuthService.updateProfile(req.user.id, payload);
      res.json(user);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update profile';
      res.status(message === 'User not found' ? 404 : 500).json({ error: message });
    }
  }

  static async changePassword(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user?.id) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const { oldPassword, newPassword } = req.body as { oldPassword?: string; newPassword?: string };
      if (!oldPassword || !newPassword) {
        res.status(400).json({ error: 'Old password and new password are required' });
        return;
      }

      await AuthService.changePassword(req.user.id, oldPassword, newPassword);
      res.status(204).send();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to change password';
      const status = message === 'Old password incorrect' ? 400 : message === 'User not found' ? 404 : 500;
      res.status(status).json({ error: message });
    }
  }
}
