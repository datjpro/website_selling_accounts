import pool from '../config/database';
import { RowDataPacket } from 'mysql2';

export class PromotionRepository {
  static async findAll(): Promise<RowDataPacket[]> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM promotions ORDER BY created_at DESC');
    return rows;
  }

  static async findActive(): Promise<RowDataPacket[]> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM promotions
       WHERE is_active = true
         AND (start_date IS NULL OR start_date <= NOW())
         AND (end_date IS NULL OR end_date >= NOW())
       ORDER BY created_at DESC`
    );
    return rows;
  }

  static async findByCode(code: string): Promise<RowDataPacket | null> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM promotions WHERE code = ? LIMIT 1', [code]);
    return rows[0] || null;
  }

  static async incrementUsage(id: number): Promise<void> {
    await pool.query('UPDATE promotions SET usage_count = usage_count + 1 WHERE id = ?', [id]);
  }
}
