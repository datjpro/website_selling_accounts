import pool from '../config/database';
import { Account, CreateAccountDTO, UpdateAccountDTO } from '../types/account';

export class AccountModel {
  static async findAll(): Promise<Account[]> {
    const result = await pool.query('SELECT * FROM accounts ORDER BY created_at DESC');
    return result.rows;
  }

  static async findById(id: number): Promise<Account | null> {
    const result = await pool.query('SELECT * FROM accounts WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  static async create(data: CreateAccountDTO): Promise<Account> {
    const result = await pool.query(
      `INSERT INTO accounts (title, description, price, category, status) 
       VALUES ($1, $2, $3, $4, 'available') 
       RETURNING *`,
      [data.title, data.description, data.price, data.category]
    );
    return result.rows[0];
  }

  static async update(id: number, data: UpdateAccountDTO): Promise<Account | null> {
    const fields: string[] = [];
    const values: (string | number)[] = [];
    let paramCount = 1;

    if (data.title !== undefined) {
      fields.push(`title = $${paramCount++}`);
      values.push(data.title);
    }
    if (data.description !== undefined) {
      fields.push(`description = $${paramCount++}`);
      values.push(data.description);
    }
    if (data.price !== undefined) {
      fields.push(`price = $${paramCount++}`);
      values.push(data.price);
    }
    if (data.category !== undefined) {
      fields.push(`category = $${paramCount++}`);
      values.push(data.category);
    }
    if (data.status !== undefined) {
      fields.push(`status = $${paramCount++}`);
      values.push(data.status);
    }

    if (fields.length === 0) return this.findById(id);

    fields.push(`updated_at = NOW()`);
    values.push(id);

    const result = await pool.query(
      `UPDATE accounts SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );
    return result.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM accounts WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  }
}
