import bcrypt from 'bcryptjs';
import jwt, { Secret, SignOptions } from 'jsonwebtoken';
import { UserRepository, UserEntity } from '../repositories/user-repository';
import { AuthResponse, UserResponse, RegisterData, LoginCredentials } from '../types/auth';

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
    if (existing) throw new Error('Email already registered');

    const passwordHash = await bcrypt.hash(data.password, 10);
    const userId = await UserRepository.create({
      username: data.username,
      email: data.email,
      password_hash: passwordHash,
      full_name: data.fullName,
      phone: data.phone,
    });

    const user = await UserRepository.findById(userId);
    if (!user) throw new Error('Failed to retrieve created user');

    return {
      token: generateToken(userId),
      user: mapUserResponse(user),
    };
  }

  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const user = await UserRepository.findByEmail(credentials.email);
    if (!user) throw new Error('Invalid email or password');

    const isMatch = await bcrypt.compare(credentials.password, user.password_hash);
    if (!isMatch) throw new Error('Invalid email or password');

    if (user.status !== 'active') throw new Error(`User account is ${user.status}`);

    return {
      token: generateToken(user.id),
      user: mapUserResponse(user),
    };
  }

  static async getMe(userId: string): Promise<UserResponse> {
    const user = await UserRepository.findById(userId);
    if (!user) throw new Error('User not found');
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
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(oldPass, user.password_hash);
    if (!isMatch) throw new Error('Old password incorrect');

    const passwordHash = await bcrypt.hash(newPass, 10);
    await UserRepository.update(userId, { password_hash: passwordHash });
  }
}
