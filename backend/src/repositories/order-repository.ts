import pool from '../config/database';
import { PoolConnection, ResultSetHeader, RowDataPacket } from 'mysql2/promise';

export interface CreateOrderRecord {
  userId?: string | null;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string | null;
  totalAmount: number;
  discountAmount: number;
  finalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  status: string;
  customerNote?: string | null;
  promotionId?: number | null;
}

export interface CreateOrderItemRecord {
  orderId: string;
  productId: string;
  productName: string;
  productPrice: number;
  subtotal: number;
  priceAtPurchase: number;
  quantity: number;
}

export class OrderRepository {
  static async getConnection(): Promise<PoolConnection> {
    return pool.getConnection();
  }

  static async createOrder(connection: PoolConnection, payload: CreateOrderRecord): Promise<string> {
    const [idRows] = await connection.query<RowDataPacket[]>('SELECT UUID() AS id');
    const generatedId = idRows[0].id as string;

    await connection.query<ResultSetHeader>(
      `INSERT INTO orders (
        id, order_number, user_id, customer_name, customer_email, customer_phone,
        total_amount, discount_amount, final_amount, payment_method, payment_status,
        status, customer_note, promotion_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        generatedId,
        payload.orderNumber,
        payload.userId ?? null,
        payload.customerName,
        payload.customerEmail,
        payload.customerPhone ?? null,
        payload.totalAmount,
        payload.discountAmount,
        payload.finalAmount,
        payload.paymentMethod,
        payload.paymentStatus,
        payload.status,
        payload.customerNote ?? null,
        payload.promotionId ?? null,
      ]
    );

    return generatedId;
  }

  static async createOrderItems(connection: PoolConnection, items: CreateOrderItemRecord[]): Promise<void> {
    for (const item of items) {
      const [idRows] = await connection.query<RowDataPacket[]>('SELECT UUID() AS id');
      const itemId = idRows[0].id as string;

      await connection.query<ResultSetHeader>(
        `INSERT INTO order_items (
          id, order_id, product_id, product_name, product_price,
          subtotal, price_at_purchase, quantity
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          itemId,
          item.orderId,
          item.productId,
          item.productName,
          item.productPrice,
          item.subtotal,
          item.priceAtPurchase,
          item.quantity,
        ]
      );
    }
  }

  static async findById(id: string): Promise<RowDataPacket | null> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM orders WHERE id = ? LIMIT 1', [id]);
    return rows[0] || null;
  }

  static async findByOrderNumber(orderNumber: string): Promise<RowDataPacket | null> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM orders WHERE order_number = ? LIMIT 1', [orderNumber]);
    return rows[0] || null;
  }

  static async findByUserId(userId: string): Promise<RowDataPacket[]> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', [userId]);
    return rows;
  }

  static async findItemsByOrderId(orderId: string): Promise<RowDataPacket[]> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM order_items WHERE order_id = ? ORDER BY id ASC', [orderId]);
    return rows;
  }

  static async updateCancel(orderId: string): Promise<void> {
    await pool.query(
      `UPDATE orders SET status = 'cancelled', payment_status = CASE WHEN payment_status = 'paid' THEN 'refunded' ELSE payment_status END WHERE id = ?`,
      [orderId]
    );
  }
}
