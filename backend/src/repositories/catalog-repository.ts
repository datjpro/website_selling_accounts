import pool from '../config/database';
import { RowDataPacket } from 'mysql2';
import { ProductFilters } from '../types/catalog';

export class CategoryRepository {
  static async findAll(): Promise<RowDataPacket[]> {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT id, name, slug, description, image_url, icon_url, is_active FROM categories WHERE is_active = true ORDER BY name ASC'
    );
    return rows;
  }

  static async findById(id: number): Promise<RowDataPacket | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT id, name, slug, description, image_url, icon_url, is_active FROM categories WHERE id = ? LIMIT 1',
      [id]
    );
    return rows[0] || null;
  }

  static async findBySlug(slug: string): Promise<RowDataPacket | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT id, name, slug, description, image_url, icon_url, is_active FROM categories WHERE slug = ? LIMIT 1',
      [slug]
    );
    return rows[0] || null;
  }
}

export class ProductRepository {
  static async findMany(filters: ProductFilters): Promise<{ rows: RowDataPacket[]; total: number }> {
    const whereClauses: string[] = ['1 = 1'];
    const values: Array<string | number | boolean> = [];

    if (filters.categoryId !== undefined) {
      whereClauses.push('p.category_id = ?');
      values.push(filters.categoryId);
    }
    if (filters.minPrice !== undefined) {
      whereClauses.push('p.price >= ?');
      values.push(filters.minPrice);
    }
    if (filters.maxPrice !== undefined) {
      whereClauses.push('p.price <= ?');
      values.push(filters.maxPrice);
    }
    if (filters.search) {
      whereClauses.push('(p.name LIKE ? OR p.game_title LIKE ? OR p.description LIKE ?)');
      const searchTerm = `%${filters.search}%`;
      values.push(searchTerm, searchTerm, searchTerm);
    }
    if (filters.isFeatured !== undefined) {
      whereClauses.push('p.is_featured = ?');
      values.push(filters.isFeatured);
    }
    if (filters.isHot !== undefined) {
      whereClauses.push('p.is_hot = ?');
      values.push(filters.isHot);
    }
    if (filters.status) {
      whereClauses.push('p.status = ?');
      values.push(filters.status);
    }

    const page = filters.page ?? 1;
    const limit = filters.limit ?? 12;
    const offset = (page - 1) * limit;

    const sortMap: Record<string, string> = {
      price: 'p.price',
      rating: 'p.rating_average',
      newest: 'p.created_at',
      popular: 'p.sold_count',
    };
    const sortBy = sortMap[filters.sortBy ?? 'newest'] || 'p.created_at';
    const sortOrder = filters.sortOrder === 'asc' ? 'ASC' : 'DESC';

    const whereSql = whereClauses.join(' AND ');

    const [countRows] = await pool.query<RowDataPacket[]>(
      `SELECT COUNT(*) AS total FROM products p WHERE ${whereSql}`,
      values
    );

    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT 
        p.id, p.category_id, p.name, p.slug, p.game_title, p.description, p.price, p.original_price,
        p.discount_percent, p.rank_level, p.server_region, p.account_type, p.has_email, p.has_phone,
        p.stock_quantity, p.sold_count, p.status, p.is_featured, p.is_hot, p.badge,
        p.rating_average, p.rating_count, p.created_at,
        c.id AS category_ref_id, c.name AS category_name, c.slug AS category_slug,
        c.description AS category_description, c.image_url AS category_image_url,
        c.icon_url AS category_icon_url, c.is_active AS category_is_active,
        pi.id AS image_id, pi.product_id AS image_product_id, pi.image_url,
        pi.is_primary, pi.sort_order
      FROM products p
      LEFT JOIN categories c ON c.id = p.category_id
      LEFT JOIN product_images pi ON pi.product_id = p.id AND pi.is_primary = true
      WHERE ${whereSql}
      ORDER BY ${sortBy} ${sortOrder}
      LIMIT ? OFFSET ?`,
      [...values, limit, offset]
    );

    return { rows, total: Number(countRows[0]?.total ?? 0) };
  }

  static async findById(id: string): Promise<RowDataPacket | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT 
        p.id, p.category_id, p.name, p.slug, p.game_title, p.description, p.price, p.original_price,
        p.discount_percent, p.rank_level, p.server_region, p.account_type, p.has_email, p.has_phone,
        p.stock_quantity, p.sold_count, p.status, p.is_featured, p.is_hot, p.badge,
        p.rating_average, p.rating_count, p.created_at,
        c.id AS category_ref_id, c.name AS category_name, c.slug AS category_slug,
        c.description AS category_description, c.image_url AS category_image_url,
        c.icon_url AS category_icon_url, c.is_active AS category_is_active
      FROM products p
      LEFT JOIN categories c ON c.id = p.category_id
      WHERE p.id = ? LIMIT 1`,
      [id]
    );
    return rows[0] || null;
  }

  static async findBySlug(slug: string): Promise<RowDataPacket | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT 
        p.id, p.category_id, p.name, p.slug, p.game_title, p.description, p.price, p.original_price,
        p.discount_percent, p.rank_level, p.server_region, p.account_type, p.has_email, p.has_phone,
        p.stock_quantity, p.sold_count, p.status, p.is_featured, p.is_hot, p.badge,
        p.rating_average, p.rating_count, p.created_at,
        c.id AS category_ref_id, c.name AS category_name, c.slug AS category_slug,
        c.description AS category_description, c.image_url AS category_image_url,
        c.icon_url AS category_icon_url, c.is_active AS category_is_active
      FROM products p
      LEFT JOIN categories c ON c.id = p.category_id
      WHERE p.slug = ? LIMIT 1`,
      [slug]
    );
    return rows[0] || null;
  }

  static async findFeatured(limit: number): Promise<RowDataPacket[]> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT 
        p.id, p.category_id, p.name, p.slug, p.game_title, p.description, p.price, p.original_price,
        p.discount_percent, p.rank_level, p.server_region, p.account_type, p.has_email, p.has_phone,
        p.stock_quantity, p.sold_count, p.status, p.is_featured, p.is_hot, p.badge,
        p.rating_average, p.rating_count, p.created_at,
        c.id AS category_ref_id, c.name AS category_name, c.slug AS category_slug,
        c.description AS category_description, c.image_url AS category_image_url,
        c.icon_url AS category_icon_url, c.is_active AS category_is_active,
        pi.id AS image_id, pi.product_id AS image_product_id, pi.image_url,
        pi.is_primary, pi.sort_order
      FROM products p
      LEFT JOIN categories c ON c.id = p.category_id
      LEFT JOIN product_images pi ON pi.product_id = p.id AND pi.is_primary = true
      WHERE p.is_featured = true AND p.status = 'active'
      ORDER BY p.created_at DESC
      LIMIT ?`,
      [limit]
    );
    return rows;
  }

  static async findRelated(productId: string, limit: number): Promise<RowDataPacket[]> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT 
        p.id, p.category_id, p.name, p.slug, p.game_title, p.description, p.price, p.original_price,
        p.discount_percent, p.rank_level, p.server_region, p.account_type, p.has_email, p.has_phone,
        p.stock_quantity, p.sold_count, p.status, p.is_featured, p.is_hot, p.badge,
        p.rating_average, p.rating_count, p.created_at,
        c.id AS category_ref_id, c.name AS category_name, c.slug AS category_slug,
        c.description AS category_description, c.image_url AS category_image_url,
        c.icon_url AS category_icon_url, c.is_active AS category_is_active,
        pi.id AS image_id, pi.product_id AS image_product_id, pi.image_url,
        pi.is_primary, pi.sort_order
      FROM products p
      JOIN products base ON base.id = ?
      LEFT JOIN categories c ON c.id = p.category_id
      LEFT JOIN product_images pi ON pi.product_id = p.id AND pi.is_primary = true
      WHERE p.id <> base.id AND p.category_id = base.category_id AND p.status = 'active'
      ORDER BY p.rating_average DESC, p.created_at DESC
      LIMIT ?`,
      [productId, limit]
    );
    return rows;
  }

  static async search(query: string): Promise<RowDataPacket[]> {
    const term = `%${query}%`;
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT 
        p.id, p.category_id, p.name, p.slug, p.game_title, p.description, p.price, p.original_price,
        p.discount_percent, p.rank_level, p.server_region, p.account_type, p.has_email, p.has_phone,
        p.stock_quantity, p.sold_count, p.status, p.is_featured, p.is_hot, p.badge,
        p.rating_average, p.rating_count, p.created_at,
        c.id AS category_ref_id, c.name AS category_name, c.slug AS category_slug,
        c.description AS category_description, c.image_url AS category_image_url,
        c.icon_url AS category_icon_url, c.is_active AS category_is_active,
        pi.id AS image_id, pi.product_id AS image_product_id, pi.image_url,
        pi.is_primary, pi.sort_order
      FROM products p
      LEFT JOIN categories c ON c.id = p.category_id
      LEFT JOIN product_images pi ON pi.product_id = p.id AND pi.is_primary = true
      WHERE p.name LIKE ? OR p.game_title LIKE ? OR p.description LIKE ?
      ORDER BY p.created_at DESC
      LIMIT 20`,
      [term, term, term]
    );
    return rows;
  }

  static async findImages(productId: string): Promise<RowDataPacket[]> {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT id, product_id, image_url, is_primary, sort_order FROM product_images WHERE product_id = ? ORDER BY is_primary DESC, sort_order ASC, id ASC',
      [productId]
    );
    return rows;
  }
}

export class ReviewRepository {
  static async findByProductId(productId: string): Promise<RowDataPacket[]> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT r.id, r.product_id, r.user_id, r.order_id, r.rating, r.title, r.comment,
              r.is_verified_purchase, r.is_approved, r.helpful_count, r.created_at,
              u.full_name AS user_name
       FROM reviews r
       LEFT JOIN users u ON u.id = r.user_id
       WHERE r.product_id = ? AND r.is_approved = true
       ORDER BY r.created_at DESC`,
      [productId]
    );
    return rows;
  }

  static async create(payload: { productId: string; userId?: string | null; orderId?: string; rating: number; title?: string; comment: string; }): Promise<number> {
    const [result] = await pool.query(
      `INSERT INTO reviews (product_id, user_id, order_id, rating, title, comment, is_verified_purchase, is_approved, helpful_count)
       VALUES (?, ?, ?, ?, ?, ?, ?, true, 0)`,
      [payload.productId, payload.userId ?? null, payload.orderId ?? null, payload.rating, payload.title ?? null, payload.comment, Boolean(payload.orderId)]
    );
    return Number((result as { insertId?: number }).insertId ?? 0);
  }

  static async findById(id: number): Promise<RowDataPacket | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT r.id, r.product_id, r.user_id, r.order_id, r.rating, r.title, r.comment,
              r.is_verified_purchase, r.is_approved, r.helpful_count, r.created_at,
              u.full_name AS user_name
       FROM reviews r
       LEFT JOIN users u ON u.id = r.user_id
       WHERE r.id = ? LIMIT 1`,
      [id]
    );
    return rows[0] || null;
  }

  static async incrementHelpful(id: number): Promise<void> {
    await pool.query('UPDATE reviews SET helpful_count = helpful_count + 1 WHERE id = ?', [id]);
  }

  static async refreshProductRating(productId: string): Promise<void> {
    await pool.query(
      `UPDATE products p
       JOIN (
         SELECT product_id, AVG(rating) AS avg_rating, COUNT(*) AS total_reviews
         FROM reviews
         WHERE product_id = ? AND is_approved = true
         GROUP BY product_id
       ) stats ON stats.product_id = p.id
       SET p.rating_average = stats.avg_rating,
           p.rating_count = stats.total_reviews`,
      [productId]
    );
  }
}

