export interface UserResponse {
  id: string;
  username: string;
  email: string;
  fullName?: string;
  phone?: string;
  avatarUrl?: string;
  role: 'user' | 'vip' | 'admin';
  status: 'active' | 'banned' | 'suspended';
  balance: number;
  totalSpent: number;
  totalOrders: number;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: UserResponse;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  fullName?: string;
  phone?: string;
}
