import bcrypt from 'bcryptjs';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { UserRepository, UserEntity } from '../repositories/user-repository';
import { AuthResponse, UserResponse, RegisterData, LoginCredentials } from '../types/auth';
import { ApiError } from '../utils/api-error';

const JWT_SECRET: Secret = (process.env.JWT_SECRET || 'shopacc_secret_2024') as Secret;
const JWT_EXPIRES_IN: SignOptions['expiresIn'] =
  (process.env.JWT_EXPIRES_IN as SignOptions['expiresIn']) || '7d';

const mapUserResponse = (user: UserEntity): UserResponse => ({
  id: user.id,
  username: user.username,
  email: user.email,
  fullName: user.full_name ?? undefined,
  phone: user.phone ?? undefined,
  avatarUrl: user.avatar_url ?? undefined,
  role: user.role,
  status: user.status,
  balance: Number(user.balance),
  totalSpent: Number(user.total_spent),
  totalOrders: Number(user.total_orders),
  createdAt: user.created_at.toISOString(),
});

const generateToken = (userId: string): string => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export class AuthService {
  static async register(data: RegisterData): Promise<AuthResponse> {
    const existing = await UserRepository.findByEmail(data.email);
    if (existing) throw ApiError.conflict('Email dã du?c dang ký');

    const existingUsername = await UserRepository.findByUsername(data.username);
    if (existingUsername) throw ApiError.conflict('Tên dang nh?p dã t?n t?i');

    const passwordHash = await bcrypt.hash(data.password, 10);
    const userId = await UserRepository.create({
      username: data.username,
      email: data.email,
      password_hash: passwordHash,
      full_name: data.fullName,
      phone: data.phone,
    });

    const user = await UserRepository.findById(userId);
    if (!user) throw ApiError.internal('Không th? t?i user sau khi t?o');

    return {
      token: generateToken(userId),
      user: mapUserResponse(user),
    };
  }

  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const user = await UserRepository.findByEmail(credentials.email);
    if (!user) throw ApiError.badRequest('Email ho?c m?t kh?u không dúng');

    const isMatch = await bcrypt.compare(credentials.password, user.password_hash);
    if (!isMatch) throw ApiError.badRequest('Email ho?c m?t kh?u không dúng');

    if (user.status !== 'active') throw ApiError.forbidden(`Tài kho?n dang ? tr?ng thái ${user.status}`);

    return {
      token: generateToken(user.id),
      user: mapUserResponse(user),
    };
  }

  static async getMe(userId: string): Promise<UserResponse> {
    const user = await UserRepository.findById(userId);
    if (!user) throw ApiError.notFound('Không tìm th?y ngu?i dùng');
    return mapUserResponse(user);
  }

  static async updateProfile(userId: string, data: Partial<UserResponse>): Promise<UserResponse> {
    await UserRepository.update(userId, {
      full_name: data.fullName,
      phone: data.phone,
      avatar_url: data.avatarUrl,
    });
    return this.getMe(userId);
  }

  static async changePassword(userId: string, oldPass: string, newPass: string): Promise<void> {
    const user = await UserRepository.findById(userId);
    if (!user) throw ApiError.notFound('Không tìm th?y ngu?i dùng');

    const isMatch = await bcrypt.compare(oldPass, user.password_hash);
    if (!isMatch) throw ApiError.badRequest('M?t kh?u cu không dúng');

    const passwordHash = await bcrypt.hash(newPass, 10);
    await UserRepository.update(userId, { password_hash: passwordHash });
  }
}
