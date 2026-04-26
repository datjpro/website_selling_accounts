import { Request, Response } from 'express';
import { AuthService } from '../services/auth-service';
import { AuthenticatedRequest } from '../middleware/require-auth';
import { LoginCredentials, RegisterData, UserResponse } from '../types/auth';
import { ApiError } from '../utils/api-error';
import { ApiResponse } from '../utils/api-response';
import { asyncHandler } from '../utils/async-handler';

export class AuthController {
  static login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const payload = req.body as LoginCredentials;
    if (!payload.email || !payload.password) throw ApiError.badRequest('Email and password are required');
    const result = await AuthService.login(payload);
    res.json(new ApiResponse('Login successful', result));
  });

  static register = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const payload = req.body as RegisterData;
    if (!payload.username || !payload.email || !payload.password) throw ApiError.badRequest('Username, email and password are required');
    const result = await AuthService.register(payload);
    res.status(201).json(new ApiResponse('Register successful', result));
  });

  static logout = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
    res.status(204).send();
  });

  static me = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    if (!req.user?.id) throw ApiError.unauthorized('Unauthorized');
    const user = await AuthService.getMe(req.user.id);
    res.json(new ApiResponse('Profile loaded', user));
  });

  static updateProfile = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    if (!req.user?.id) throw ApiError.unauthorized('Unauthorized');
    const payload = req.body as Partial<UserResponse>;
    const user = await AuthService.updateProfile(req.user.id, payload);
    res.json(new ApiResponse('Profile updated', user));
  });

  static changePassword = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    if (!req.user?.id) throw ApiError.unauthorized('Unauthorized');
    const { oldPassword, newPassword } = req.body as { oldPassword?: string; newPassword?: string };
    if (!oldPassword || !newPassword) throw ApiError.badRequest('Old password and new password are required');
    await AuthService.changePassword(req.user.id, oldPassword, newPassword);
    res.status(204).send();
  });
}
