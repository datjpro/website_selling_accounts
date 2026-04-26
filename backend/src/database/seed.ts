import dotenv from 'dotenv';
import pool from '../config/database';
import { ensureDatabaseSchema } from './schema-init';
import { RowDataPacket } from 'mysql2';

dotenv.config();

type CategoryRow = RowDataPacket & { id: number; slug: string };
type ProductRow = RowDataPacket & { id: string; slug: string };

const seed = async (): Promise<void> => {
  await ensureDatabaseSchema();

  await pool.query("DELETE FROM transactions WHERE description LIKE 'Seed %'");
  await pool.query("DELETE FROM order_items WHERE product_name LIKE 'Seed %'");
  await pool.query("DELETE FROM orders WHERE customer_email LIKE 'seed.%@example.com'");
  await pool.query("DELETE FROM reviews WHERE title LIKE 'Seed %'");
  await pool.query("DELETE FROM product_images WHERE image_url LIKE 'https://seed.example.com/%'");
  await pool.query("DELETE FROM products WHERE slug IN ('seed-lien-quan', 'seed-free-fire')");
  await pool.query("DELETE FROM categories WHERE slug IN ('seed-moba', 'seed-battle-royale')");
  await pool.query("DELETE FROM promotions WHERE code IN ('SEED10', 'SEED50K')");
  await pool.query("DELETE FROM users WHERE email IN ('seed.admin@example.com', 'seed.user@example.com')");

  await pool.query(`INSERT INTO users (id, username, email, password_hash, full_name, role, status)
    VALUES (UUID(), 'seedadmin', 'seed.admin@example.com', '$2b$10$7sDqR8j2n0Q5l3a9mVjH1OtV3l3eBfV7xj6lWvC2k4Y8aT5u5M9qK', 'Seed Admin', 'admin', 'active')`);
  await pool.query(`INSERT INTO users (id, username, email, password_hash, full_name, role, status)
    VALUES (UUID(), 'seeduser', 'seed.user@example.com', '$2b$10$7sDqR8j2n0Q5l3a9mVjH1OtV3l3eBfV7xj6lWvC2k4Y8aT5u5M9qK', 'Seed User', 'user', 'active')`);

  await pool.query("INSERT INTO categories (name, slug, description, is_active) VALUES ('Seed MOBA', 'seed-moba', 'Seed category for MOBA products', true)");
  await pool.query("INSERT INTO categories (name, slug, description, is_active) VALUES ('Seed Battle Royale', 'seed-battle-royale', 'Seed category for battle royale products', true)");

  const [categoryRows] = await pool.query<CategoryRow[]>("SELECT id, slug FROM categories WHERE slug IN ('seed-moba', 'seed-battle-royale')");
  const mobaId = categoryRows.find((row) => row.slug === 'seed-moba')?.id;
  const brId = categoryRows.find((row) => row.slug === 'seed-battle-royale')?.id;

  await pool.query(`INSERT INTO products (id, category_id, title, name, slug, game_title, description, price, original_price, stock_quantity, status, is_featured, is_hot, is_active)
    VALUES (UUID(), ?, 'Seed Liên Quân', 'Seed Liên Quân', 'seed-lien-quan', 'Liên Quân Mobile', 'Seed product for MOBA', 250000, 300000, 5, 'active', true, true, true)`, [mobaId]);
  await pool.query(`INSERT INTO products (id, category_id, title, name, slug, game_title, description, price, original_price, stock_quantity, status, is_featured, is_hot, is_active)
    VALUES (UUID(), ?, 'Seed Free Fire', 'Seed Free Fire', 'seed-free-fire', 'Free Fire', 'Seed product for battle royale', 180000, 220000, 8, 'active', false, true, true)`, [brId]);

  const [productRows] = await pool.query<ProductRow[]>("SELECT id, slug FROM products WHERE slug IN ('seed-lien-quan', 'seed-free-fire')");
  for (const product of productRows) {
    await pool.query('INSERT INTO product_images (product_id, image_url, is_primary, sort_order) VALUES (?, ?, true, 0)', [product.id, `https://seed.example.com/${product.slug}.png`]);
  }

  await pool.query(`INSERT INTO promotions (code, title, description, discount_type, discount_value, min_order_amount, usage_limit, usage_count, usage_per_user, is_active, badge, start_date, end_date, discount_percent, valid_until)
    VALUES ('SEED10', 'Seed 10%', 'Discount 10 percent for testing', 'percentage', 10, 100000, 100, 0, 1, true, 'HOT', NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), 10, DATE_ADD(NOW(), INTERVAL 30 DAY))`);
  await pool.query(`INSERT INTO promotions (code, title, description, discount_type, discount_value, min_order_amount, usage_limit, usage_count, usage_per_user, is_active, badge, start_date, end_date, discount_percent, valid_until)
    VALUES ('SEED50K', 'Seed 50K', 'Discount fixed 50k for testing', 'fixed', 50000, 200000, 100, 0, 1, true, 'VIP', NOW(), DATE_ADD(NOW(), INTERVAL 30 DAY), 0, DATE_ADD(NOW(), INTERVAL 30 DAY))`);

  console.log('Seed completed successfully');
  await pool.end();
};

void seed().catch(async (error) => {
  console.error('Seed failed:', error);
  await pool.end();
  process.exit(1);
});
