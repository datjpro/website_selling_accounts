import apiClient from "./api";

export interface OrderItem {
  id?: number;
  productId: number;
  productName: string;
  productPrice: number;
  quantity: number;
  subtotal: number;
  accountUsername?: string;
  accountPassword?: string;
  accountEmail?: string;
  additionalInfo?: string;
}

export interface Order {
  id: number;
  orderNumber: string;
  userId: number;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  paymentMethod: string;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  status: "pending" | "processing" | "completed" | "cancelled" | "refunded";
  customerNote?: string;
  adminNote?: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
  paidAt?: string;
  completedAt?: string;
}

export interface CreateOrderData {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  paymentMethod: string;
  customerNote?: string;
  items: {
    productId: number;
    quantity: number;
  }[];
  promotionCode?: string;
}

export const orderService = {
  createOrder: async (data: CreateOrderData): Promise<Order> => {
    const response = await apiClient.post("/orders", data);
    return response.data.data;
  },

  getMyOrders: async (): Promise<Order[]> => {
    const response = await apiClient.get("/orders/my-orders");
    return response.data.data;
  },

  getOrderById: async (id: number): Promise<Order> => {
    const response = await apiClient.get(`/orders/${id}`);
    return response.data.data;
  },

  getOrderByNumber: async (orderNumber: string): Promise<Order> => {
    const response = await apiClient.get(`/orders/number/${orderNumber}`);
    return response.data.data;
  },

  cancelOrder: async (id: number): Promise<Order> => {
    const response = await apiClient.post(`/orders/${id}/cancel`);
    return response.data.data;
  },
};
