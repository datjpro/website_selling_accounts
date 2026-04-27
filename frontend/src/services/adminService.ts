import apiClient from "./api";
import type { Category, Product } from "./productService";
import type { Order } from "./orderService";
import type { Promotion } from "./promotionService";
import type { User } from "./authService";

export interface AdminOrderSummary {
  id: string;
  orderNumber: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  finalAmount: number;
  status: Order["status"];
  paymentStatus: Order["paymentStatus"];
  createdAt: string;
}

export interface AdminProductPayload {
  categoryId?: number | null;
  title: string;
  name: string;
  slug: string;
  gameTitle: string;
  description: string;
  price: number;
  originalPrice?: number | null;
  stockQuantity?: number;
  status?: string;
  isFeatured?: boolean;
  isHot?: boolean;
}

export const adminService = {
  getUsers: async (): Promise<User[]> => {
    const response = await apiClient.get("/admin/users");
    return response.data.data;
  },

  getCategories: async (): Promise<Category[]> => {
    const response = await apiClient.get("/admin/categories");
    return response.data.data;
  },

  getProducts: async (): Promise<Product[]> => {
    const response = await apiClient.get("/admin/products");
    return response.data.data;
  },

  getOrders: async (): Promise<AdminOrderSummary[]> => {
    const response = await apiClient.get("/admin/orders");
    return response.data.data;
  },

  getPromotions: async (): Promise<Promotion[]> => {
    const response = await apiClient.get("/admin/promotions");
    return response.data.data;
  },

  createProduct: async (payload: AdminProductPayload): Promise<Product> => {
    const response = await apiClient.post("/admin/products", payload);
    return response.data.data;
  },

  updateProduct: async (id: string, payload: Partial<AdminProductPayload>): Promise<Product> => {
    const response = await apiClient.put(`/admin/products/${id}`, payload);
    return response.data.data;
  },

  deleteProduct: async (id: string): Promise<void> => {
    await apiClient.delete(`/admin/products/${id}`);
  },

  updateOrderStatus: async (id: string, status: string, paymentStatus?: string): Promise<Order> => {
    const response = await apiClient.put(`/admin/orders/${id}/status`, { status, paymentStatus });
    return response.data.data;
  },
};
