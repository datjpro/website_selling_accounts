export interface OrderItemResponse {
  id: string;
  productId: string | null;
  productName: string;
  productPrice: number;
  quantity: number;
  subtotal: number;
  accountUsername?: string;
  accountPassword?: string;
  accountEmail?: string;
  additionalInfo?: string;
}

export interface OrderResponse {
  id: string;
  orderNumber: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded';
  customerNote?: string;
  adminNote?: string;
  items: OrderItemResponse[];
  createdAt: string;
  updatedAt: string;
  paidAt?: string;
  completedAt?: string;
}

export interface CreateOrderItemDto {
  productId: string;
  quantity: number;
}

export interface CreateOrderDto {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  paymentMethod: string;
  customerNote?: string;
  items: CreateOrderItemDto[];
  promotionCode?: string;
}
