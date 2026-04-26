import pool from '../config/database';
import { ProductRepository } from '../repositories/catalog-repository';
import { OrderRepository } from '../repositories/order-repository';
import { TransactionRepository } from '../repositories/transaction-repository';
import { CreateOrderDto, OrderItemResponse, OrderResponse } from '../types/order';
import { PromotionService } from './promotion-service';
import { RowDataPacket } from 'mysql2';

const mapOrderItem = (row: RowDataPacket): OrderItemResponse => ({
  id: row.id,
  productId: row.product_id,
  productName: row.product_name,
  productPrice: Number(row.product_price ?? row.price_at_purchase ?? 0),
  quantity: Number(row.quantity),
  subtotal: Number(row.subtotal ?? 0),
  accountUsername: row.account_username ?? undefined,
  accountPassword: row.account_password ?? undefined,
  accountEmail: row.account_email ?? undefined,
  additionalInfo: row.additional_info ?? undefined,
});

const mapOrder = (row: RowDataPacket, items: OrderItemResponse[]): OrderResponse => ({
  id: row.id,
  orderNumber: row.order_number,
  userId: row.user_id ?? undefined,
  customerName: row.customer_name,
  customerEmail: row.customer_email,
  customerPhone: row.customer_phone ?? undefined,
  totalAmount: Number(row.total_amount),
  discountAmount: Number(row.discount_amount ?? 0),
  finalAmount: Number(row.final_amount ?? row.total_amount),
  paymentMethod: row.payment_method,
  paymentStatus: row.payment_status,
  status: row.status,
  customerNote: row.customer_note ?? undefined,
  adminNote: row.admin_note ?? undefined,
  items,
  createdAt: new Date(row.created_at).toISOString(),
  updatedAt: new Date(row.updated_at).toISOString(),
  paidAt: row.paid_at ? new Date(row.paid_at).toISOString() : undefined,
  completedAt: row.completed_at ? new Date(row.completed_at).toISOString() : undefined,
});

const generateOrderNumber = (): string => {
  const now = new Date();
  const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
  const random = Math.floor(1000 + Math.random() * 9000);
  return `ORD-${stamp}-${random}`;
};

export class OrderService {
  static async createOrder(payload: CreateOrderDto, userId?: string): Promise<OrderResponse> {
    if (!payload.items || payload.items.length === 0) {
      throw new Error('Order items are required');
    }

    const connection = await OrderRepository.getConnection();

    try {
      await connection.beginTransaction();

      const itemSnapshots: Array<{ productId: string; productName: string; productPrice: number; quantity: number; subtotal: number; stockQuantity: number }> = [];

      for (const item of payload.items) {
        const product = await ProductRepository.findById(item.productId);
        if (!product) {
          throw new Error(`Product not found: ${item.productId}`);
        }
        if (product.status !== 'active') {
          throw new Error(`Product is not available: ${item.productId}`);
        }
        const stock = Number(product.stock_quantity ?? 0);
        if (stock < item.quantity) {
          throw new Error(`Insufficient stock for product: ${item.productId}`);
        }

        const price = Number(product.price);
        itemSnapshots.push({
          productId: product.id,
          productName: product.name ?? product.title,
          productPrice: price,
          quantity: item.quantity,
          subtotal: price * item.quantity,
          stockQuantity: stock,
        });
      }

      const totalAmount = itemSnapshots.reduce((sum, item) => sum + item.subtotal, 0);
      let discountAmount = 0;
      let promotionId: number | undefined;

      if (payload.promotionCode) {
        const validation = await PromotionService.validatePromotion({
          code: payload.promotionCode,
          orderAmount: totalAmount,
          userId,
        });
        if (!validation.valid) {
          throw new Error(validation.message || 'Promotion validation failed');
        }
        discountAmount = Number(validation.discountAmount ?? 0);
        promotionId = validation.promotion?.id;
      }

      const finalAmount = Math.max(0, totalAmount - discountAmount);
      const orderNumber = generateOrderNumber();

      const orderId = await OrderRepository.createOrder(connection, {
        userId,
        orderNumber,
        customerName: payload.customerName,
        customerEmail: payload.customerEmail,
        customerPhone: payload.customerPhone,
        totalAmount,
        discountAmount,
        finalAmount,
        paymentMethod: payload.paymentMethod,
        paymentStatus: 'pending',
        status: 'pending',
        customerNote: payload.customerNote,
        promotionId,
      });

      await OrderRepository.createOrderItems(
        connection,
        itemSnapshots.map((item) => ({
          orderId,
          productId: item.productId,
          productName: item.productName,
          productPrice: item.productPrice,
          subtotal: item.subtotal,
          priceAtPurchase: item.productPrice,
          quantity: item.quantity,
        }))
      );

      for (const item of itemSnapshots) {
        await connection.query(
          'UPDATE products SET stock_quantity = stock_quantity - ?, sold_count = sold_count + ? WHERE id = ?',
          [item.quantity, item.quantity, item.productId]
        );
      }

      if (promotionId !== undefined) {
        await connection.query('UPDATE promotions SET usage_count = usage_count + 1 WHERE id = ?', [promotionId]);
      }

      await TransactionRepository.create(connection, {
        orderId,
        userId,
        paymentMethod: payload.paymentMethod,
        status: 'pending',
        amount: finalAmount,
        description: `Payment transaction for ${orderNumber}`,
      });

      if (userId) {
        await connection.query(
          'UPDATE users SET total_orders = total_orders + 1, total_spent = total_spent + ? WHERE id = ?',
          [finalAmount, userId]
        );
      }

      await connection.commit();
      const order = await this.getOrderById(orderId);
      if (!order) throw new Error('Failed to load created order');
      return order;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  static async getMyOrders(userId: string): Promise<OrderResponse[]> {
    const rows = await OrderRepository.findByUserId(userId);
    const results: OrderResponse[] = [];
    for (const row of rows) {
      const items = await OrderRepository.findItemsByOrderId(row.id);
      results.push(mapOrder(row, items.map(mapOrderItem)));
    }
    return results;
  }

  static async getOrderById(id: string): Promise<OrderResponse | null> {
    const row = await OrderRepository.findById(id);
    if (!row) return null;
    const items = await OrderRepository.findItemsByOrderId(id);
    return mapOrder(row, items.map(mapOrderItem));
  }

  static async getOrderByNumber(orderNumber: string): Promise<OrderResponse | null> {
    const row = await OrderRepository.findByOrderNumber(orderNumber);
    if (!row) return null;
    const items = await OrderRepository.findItemsByOrderId(row.id);
    return mapOrder(row, items.map(mapOrderItem));
  }

  static async cancelOrder(id: string, userId?: string): Promise<OrderResponse | null> {
    const order = await OrderRepository.findById(id);
    if (!order) return null;
    if (userId && order.user_id && order.user_id !== userId) {
      throw new Error('Forbidden');
    }
    if (order.status === 'cancelled') {
      return this.getOrderById(id);
    }

    const items = await OrderRepository.findItemsByOrderId(id);
    await OrderRepository.updateCancel(id);
    for (const item of items) {
      if (item.product_id) {
        await pool.query(
          'UPDATE products SET stock_quantity = stock_quantity + ?, sold_count = GREATEST(sold_count - ?, 0) WHERE id = ?',
          [Number(item.quantity), Number(item.quantity), item.product_id]
        );
      }
    }

    return this.getOrderById(id);
  }
}

