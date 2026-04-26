import apiClient from "./api";

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

export interface User {
  id: number;
  username: string;
  email: string;
  fullName?: string;
  phone?: string;
  avatarUrl?: string;
  role: "user" | "vip" | "admin";
  status: "active" | "banned" | "suspended";
  balance: number;
  totalSpent: number;
  totalOrders: number;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await apiClient.post("/auth/login", credentials);
    return response.data.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await apiClient.post("/auth/register", data);
    return response.data.data;
  },

  logout: async (): Promise<void> => {
    await apiClient.post("/auth/logout");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get("/auth/me");
    return response.data.data;
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await apiClient.put("/auth/profile", data);
    return response.data.data;
  },

  changePassword: async (
    oldPassword: string,
    newPassword: string
  ): Promise<void> => {
    await apiClient.post("/auth/change-password", { oldPassword, newPassword });
  },
};
