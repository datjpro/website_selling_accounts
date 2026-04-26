import pool from '../config/database';
import { Account, CreateAccountDTO, UpdateAccountDTO } from '../types/account';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export class AccountModel {
  static async findAll(): Promise<Account[]> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM products ORDER BY created_at DESC');
    return rows as Account[];
  }

  static async findById(id: string): Promise<Account | null> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM products WHERE id = ?', [id]);
    return (rows[0] as Account) || null;
  }

  static async create(data: CreateAccountDTO): Promise<Account> {
    const [idRows] = await pool.query<RowDataPacket[]>('SELECT UUID() AS id');
    const generatedId = idRows[0].id as string;

    await pool.query<ResultSetHeader>(
      `INSERT INTO products (id, title, description, price, is_active) 
       VALUES (?, ?, ?, ?, true)`,
      [generatedId, data.title, data.description, data.price]
    );
    
    const created = await this.findById(generatedId);
    if (!created) throw new Error('Failed to retrieve created product');
    return created;
  }

  static async update(id: string, data: UpdateAccountDTO): Promise<Account | null> {
    const fields: string[] = [];
    const values: (string | number | boolean)[] = [];

    if (data.title !== undefined) {
      fields.push('title = ?');
      values.push(data.title);
    }
    if (data.description !== undefined) {
      fields.push('description = ?');
      values.push(data.description);
    }
    if (data.price !== undefined) {
      fields.push('price = ?');
      values.push(data.price);
    }
    if (data.status !== undefined) {
      fields.push('is_active = ?');
      values.push(data.status === 'available');
    }

    if (fields.length === 0) return this.findById(id);

    values.push(id);

    await pool.query<ResultSetHeader>(
      `UPDATE products SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
    
    return this.findById(id);
  }

  static async delete(id: string): Promise<boolean> {
    const [result] = await pool.query<ResultSetHeader>('DELETE FROM products WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }
}
