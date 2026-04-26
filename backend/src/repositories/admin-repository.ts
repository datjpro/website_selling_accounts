import pool from '../config/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

export class AdminRepository {
  static async listUsers(): Promise<RowDataPacket[]> {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT id, username, email, full_name, phone, avatar_url, role, status, balance, total_spent, total_orders, created_at FROM users ORDER BY created_at DESC');
    return rows;
  }

  static async updateOrderStatus(id: string, status: string, paymentStatus?: string): Promise<void> {
    const fields: string[] = ['status = ?'];
    const values: Array<string> = [status];
    if (paymentStatus) {
      fields.push('payment_status = ?');
      values.push(paymentStatus);
    }
    values.push(id);
    await pool.query(`UPDATE orders SET ${fields.join(', ')} WHERE id = ?`, values);
  }

  static async createCategory(payload: { name: string; slug: string; description?: string; imageUrl?: string; iconUrl?: string; isActive?: boolean; }): Promise<number> {
    const [result] = await pool.query<ResultSetHeader>(
      'INSERT INTO categories (name, slug, description, image_url, icon_url, is_active) VALUES (?, ?, ?, ?, ?, ?)',
      [payload.name, payload.slug, payload.description ?? null, payload.imageUrl ?? null, payload.iconUrl ?? null, payload.isActive ?? true]
    );
    return result.insertId;
  }

  static async updateCategory(id: number, payload: { name?: string; slug?: string; description?: string; imageUrl?: string; iconUrl?: string; isActive?: boolean; }): Promise<void> {
    const fields: string[] = [];
    const values: Array<string | boolean | number | null> = [];
    if (payload.name !== undefined) { fields.push('name = ?'); values.push(payload.name); }
    if (payload.slug !== undefined) { fields.push('slug = ?'); values.push(payload.slug); }
    if (payload.description !== undefined) { fields.push('description = ?'); values.push(payload.description); }
    if (payload.imageUrl !== undefined) { fields.push('image_url = ?'); values.push(payload.imageUrl); }
    if (payload.iconUrl !== undefined) { fields.push('icon_url = ?'); values.push(payload.iconUrl); }
    if (payload.isActive !== undefined) { fields.push('is_active = ?'); values.push(payload.isActive); }
    if (!fields.length) return;
    values.push(id);
    await pool.query(`UPDATE categories SET ${fields.join(', ')} WHERE id = ?`, values);
  }

  static async deleteCategory(id: number): Promise<void> {
    await pool.query('DELETE FROM categories WHERE id = ?', [id]);
  }

  static async createProduct(payload: { categoryId?: number | null; title: string; name: string; slug: string; gameTitle: string; description: string; price: number; originalPrice?: number | null; stockQuantity?: number; status?: string; isFeatured?: boolean; isHot?: boolean; }): Promise<string> {
    const [idRows] = await pool.query<RowDataPacket[]>('SELECT UUID() AS id');
    const id = idRows[0].id as string;
    await pool.query(
      `INSERT INTO products (id, category_id, title, name, slug, game_title, description, price, original_price, stock_quantity, status, is_featured, is_hot, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, true)`,
      [id, payload.categoryId ?? null, payload.title, payload.name, payload.slug, payload.gameTitle, payload.description, payload.price, payload.originalPrice ?? null, payload.stockQuantity ?? 0, payload.status ?? 'active', payload.isFeatured ?? false, payload.isHot ?? false]
    );
    return id;
  }

  static async updateProduct(id: string, payload: Record<string, unknown>): Promise<void> {
    const map: Array<[string, string]> = [
      ['categoryId', 'category_id'], ['title', 'title'], ['name', 'name'], ['slug', 'slug'], ['gameTitle', 'game_title'], ['description', 'description'], ['price', 'price'], ['originalPrice', 'original_price'], ['stockQuantity', 'stock_quantity'], ['status', 'status'], ['isFeatured', 'is_featured'], ['isHot', 'is_hot']
    ];
    const fields: string[] = [];
    const values: unknown[] = [];
    for (const [inputKey, dbKey] of map) {
      if (payload[inputKey] !== undefined) { fields.push(`${dbKey} = ?`); values.push(payload[inputKey]); }
    }
    if (!fields.length) return;
    values.push(id);
    await pool.query(`UPDATE products SET ${fields.join(', ')} WHERE id = ?`, values);
  }

  static async deleteProduct(id: string): Promise<void> {
    await pool.query('DELETE FROM products WHERE id = ?', [id]);
  }

  static async createPromotion(payload: { code: string; title: string; description?: string; discountType: string; discountValue: number; minOrderAmount?: number; maxDiscountAmount?: number | null; usageLimit?: number | null; usagePerUser?: number; isActive?: boolean; badge?: string; startDate?: string; endDate?: string; }): Promise<number> {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO promotions (code, title, description, discount_type, discount_value, min_order_amount, max_discount_amount, usage_limit, usage_count, usage_per_user, is_active, badge, start_date, end_date, discount_percent, valid_until)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?, ?, ?, ?, ?)`,
      [payload.code, payload.title, payload.description ?? null, payload.discountType, payload.discountValue, payload.minOrderAmount ?? 0, payload.maxDiscountAmount ?? null, payload.usageLimit ?? null, payload.usagePerUser ?? 1, payload.isActive ?? true, payload.badge ?? null, payload.startDate ?? null, payload.endDate ?? null, payload.discountType === 'percentage' ? payload.discountValue : 0, payload.endDate ?? new Date(Date.now() + 7 * 86400000)]
    );
    return result.insertId;
  }

  static async updatePromotion(id: number, payload: Record<string, unknown>): Promise<void> {
    const map: Array<[string, string]> = [
      ['code', 'code'], ['title', 'title'], ['description', 'description'], ['discountType', 'discount_type'], ['discountValue', 'discount_value'], ['minOrderAmount', 'min_order_amount'], ['maxDiscountAmount', 'max_discount_amount'], ['usageLimit', 'usage_limit'], ['usagePerUser', 'usage_per_user'], ['isActive', 'is_active'], ['badge', 'badge'], ['startDate', 'start_date'], ['endDate', 'end_date']
    ];
    const fields: string[] = [];
    const values: unknown[] = [];
    for (const [inputKey, dbKey] of map) {
      if (payload[inputKey] !== undefined) { fields.push(`${dbKey} = ?`); values.push(payload[inputKey]); }
    }
    if (!fields.length) return;
    values.push(id);
    await pool.query(`UPDATE promotions SET ${fields.join(', ')} WHERE id = ?`, values);
  }

  static async deletePromotion(id: number): Promise<void> {
    await pool.query('DELETE FROM promotions WHERE id = ?', [id]);
  }
}
