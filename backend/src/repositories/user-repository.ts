import pool from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export interface UserEntity {
  id: string;
  username: string;
  email: string;
  password_hash: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  role: 'user' | 'vip' | 'admin';
  status: 'active' | 'banned' | 'suspended';
  balance: number;
  total_spent: number;
  total_orders: number;
  created_at: Date;
  updated_at: Date;
}

export class UserRepository {
  static async findByEmail(email: string): Promise<UserEntity | null> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE email = ? LIMIT 1', [email]);
    return (rows[0] as UserEntity) || null;
  }

  static async findById(id: string): Promise<UserEntity | null> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM users WHERE id = ? LIMIT 1', [id]);
    return (rows[0] as UserEntity) || null;
  }

  static async create(payload: Partial<UserEntity>): Promise<string> {
    const [idRows] = await pool.query<RowDataPacket[]>('SELECT UUID() AS id');
    const generatedId = idRows[0].id as string;

    await pool.query<ResultSetHeader>(
      `INSERT INTO users (id, username, email, password_hash, full_name, phone, role, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        generatedId,
        payload.username,
        payload.email,
        payload.password_hash,
        payload.full_name ?? null,
        payload.phone ?? null,
        payload.role ?? 'user',
        payload.status ?? 'active',
      ]
    );
    return generatedId;
  }

  static async update(id: string, payload: Partial<UserEntity>): Promise<void> {
    const fields: string[] = [];
    const values: Array<string | null> = [];

    if (payload.full_name !== undefined) { fields.push('full_name = ?'); values.push(payload.full_name); }
    if (payload.phone !== undefined) { fields.push('phone = ?'); values.push(payload.phone); }
    if (payload.avatar_url !== undefined) { fields.push('avatar_url = ?'); values.push(payload.avatar_url); }
    if (payload.password_hash !== undefined) { fields.push('password_hash = ?'); values.push(payload.password_hash); }

    if (fields.length === 0) return;
    values.push(id);

    await pool.query(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`, values);
  }
}
