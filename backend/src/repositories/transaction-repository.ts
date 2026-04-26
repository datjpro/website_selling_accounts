import { PoolConnection, ResultSetHeader, RowDataPacket } from 'mysql2/promise';

export interface CreateTransactionRecord {
  orderId: string;
  userId?: string | null;
  paymentMethod: string;
  status: string;
  amount: number;
  description?: string | null;
}

export class TransactionRepository {
  static async create(connection: PoolConnection, payload: CreateTransactionRecord): Promise<string> {
    const [idRows] = await connection.query<RowDataPacket[]>('SELECT UUID() AS id');
    const generatedId = idRows[0].id as string;

    await connection.query<ResultSetHeader>(
      `INSERT INTO transactions (
        id, order_id, user_id, transaction_type, payment_method,
        status, amount, description
      ) VALUES (?, ?, ?, 'payment', ?, ?, ?, ?)`,
      [
        generatedId,
        payload.orderId,
        payload.userId ?? null,
        payload.paymentMethod,
        payload.status,
        payload.amount,
        payload.description ?? null,
      ]
    );

    return generatedId;
  }
}
