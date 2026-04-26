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
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO products (title, description, price, is_active) 
       VALUES (?, ?, ?, true)`,
      [data.title, data.description, data.price]
    );
    
    // MySQL không có RETURNING *, l?y l?i b?ng insertId (nhung dây là UUID nên l?y b?ng ID truy?n vào n?u có, 
    // ho?c query l?i. Vì ta dùng DEFAULT (UUID()), ta c?n l?y l?i row v?a t?o).
    // M?t cách don gi?n cho demo: query theo insertId n?u là AI, nhung dây là UUID VARCHAR(36).
    // Ta s? query row m?i nh?t c?a user này ho?c ch?nh l?i logic t?o ID ? code.
    // Ð? an toàn và chu?n, ta s? query l?i b?n ghi v?a chèn (gi? d?nh title + price là unique tuong d?i lúc này)
    // Ho?c t?t nh?t: Sinh UUID ? code. Nhung user mu?n sinh ? MySQL.
    
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM products ORDER BY created_at DESC LIMIT 1');
    return rows[0] as Account;
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
