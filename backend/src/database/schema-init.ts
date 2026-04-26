import fs from 'fs/promises';
import path from 'path';
import mysql from 'mysql2/promise';
import { dbConfig } from '../config/database';

const resolveSchemaPath = (): string => path.resolve(process.cwd(), 'src/database/mysql_init.sql');

const columnExists = async (connection: mysql.Connection, tableName: string, columnName: string): Promise<boolean> => {
  const [rows] = await connection.query(
    `SELECT COUNT(*) AS total
     FROM information_schema.columns
     WHERE table_schema = ? AND table_name = ? AND column_name = ?`,
    [dbConfig.database, tableName, columnName]
  );

  return Number((rows as Array<{ total: number }>)[0]?.total ?? 0) > 0;
};

const addColumnIfMissing = async (
  connection: mysql.Connection,
  tableName: string,
  columnName: string,
  definition: string
): Promise<void> => {
  const exists = await columnExists(connection, tableName, columnName);
  if (!exists) {
    await connection.query(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${definition}`);
  }
};

const indexExists = async (connection: mysql.Connection, tableName: string, indexName: string): Promise<boolean> => {
  const [rows] = await connection.query(
    `SELECT COUNT(*) AS total
     FROM information_schema.statistics
     WHERE table_schema = ? AND table_name = ? AND index_name = ?`,
    [dbConfig.database, tableName, indexName]
  );

  return Number((rows as Array<{ total: number }>)[0]?.total ?? 0) > 0;
};

const ensureUserExtensions = async (connection: mysql.Connection): Promise<void> => {
  await addColumnIfMissing(connection, 'users', 'username', 'VARCHAR(100) NULL');
  await addColumnIfMissing(connection, 'users', 'phone', 'VARCHAR(30) NULL');
  await addColumnIfMissing(connection, 'users', 'avatar_url', 'TEXT NULL');
  await addColumnIfMissing(connection, 'users', 'status', "VARCHAR(20) DEFAULT 'active'");
  await addColumnIfMissing(connection, 'users', 'balance', 'DECIMAL(12, 2) DEFAULT 0');
  await addColumnIfMissing(connection, 'users', 'total_spent', 'DECIMAL(12, 2) DEFAULT 0');
  await addColumnIfMissing(connection, 'users', 'total_orders', 'INT DEFAULT 0');

  const hasUsernameIndex = await indexExists(connection, 'users', 'idx_users_username');
  if (!hasUsernameIndex) {
    await connection.query('CREATE UNIQUE INDEX idx_users_username ON users (username)');
  }

  await connection.query("UPDATE users SET role = CASE WHEN role = 'customer' THEN 'user' ELSE role END");
  await connection.query("UPDATE users SET status = COALESCE(status, 'active')");
  await connection.query('UPDATE users SET balance = COALESCE(balance, 0), total_spent = COALESCE(total_spent, 0), total_orders = COALESCE(total_orders, 0)');
  await connection.query("UPDATE users SET username = COALESCE(username, SUBSTRING_INDEX(email, '@', 1), CONCAT('user_', REPLACE(id, '-', ''))) ");
};

const ensureCatalogExtensions = async (connection: mysql.Connection): Promise<void> => {
  await addColumnIfMissing(connection, 'categories', 'description', 'TEXT NULL');
  await addColumnIfMissing(connection, 'categories', 'image_url', 'TEXT NULL');
  await addColumnIfMissing(connection, 'categories', 'icon_url', 'TEXT NULL');
  await addColumnIfMissing(connection, 'categories', 'is_active', 'BOOLEAN DEFAULT true');

  await addColumnIfMissing(connection, 'products', 'name', 'VARCHAR(255) NULL');
  await addColumnIfMissing(connection, 'products', 'slug', 'VARCHAR(255) NULL');
  await addColumnIfMissing(connection, 'products', 'game_title', 'VARCHAR(255) NULL');
  await addColumnIfMissing(connection, 'products', 'original_price', 'DECIMAL(12, 2) NULL');
  await addColumnIfMissing(connection, 'products', 'discount_percent', 'INT DEFAULT 0');
  await addColumnIfMissing(connection, 'products', 'rank_level', 'VARCHAR(100) NULL');
  await addColumnIfMissing(connection, 'products', 'server_region', 'VARCHAR(100) NULL');
  await addColumnIfMissing(connection, 'products', 'account_type', 'VARCHAR(100) NULL');
  await addColumnIfMissing(connection, 'products', 'has_email', 'BOOLEAN DEFAULT false');
  await addColumnIfMissing(connection, 'products', 'has_phone', 'BOOLEAN DEFAULT false');
  await addColumnIfMissing(connection, 'products', 'sold_count', 'INT DEFAULT 0');
  await addColumnIfMissing(connection, 'products', 'status', "VARCHAR(50) DEFAULT 'active'");
  await addColumnIfMissing(connection, 'products', 'is_featured', 'BOOLEAN DEFAULT false');
  await addColumnIfMissing(connection, 'products', 'is_hot', 'BOOLEAN DEFAULT false');
  await addColumnIfMissing(connection, 'products', 'badge', 'VARCHAR(50) NULL');
  await addColumnIfMissing(connection, 'products', 'rating_average', 'DECIMAL(4, 2) DEFAULT 0');
  await addColumnIfMissing(connection, 'products', 'rating_count', 'INT DEFAULT 0');

  await addColumnIfMissing(connection, 'product_images', 'is_primary', 'BOOLEAN DEFAULT false');
  await addColumnIfMissing(connection, 'product_images', 'sort_order', 'INT DEFAULT 0');

  await addColumnIfMissing(connection, 'reviews', 'order_id', 'VARCHAR(36) NULL');
  await addColumnIfMissing(connection, 'reviews', 'title', 'VARCHAR(255) NULL');
  await addColumnIfMissing(connection, 'reviews', 'is_verified_purchase', 'BOOLEAN DEFAULT false');
  await addColumnIfMissing(connection, 'reviews', 'is_approved', 'BOOLEAN DEFAULT true');
  await addColumnIfMissing(connection, 'reviews', 'helpful_count', 'INT DEFAULT 0');

  const hasSlugIndex = await indexExists(connection, 'products', 'idx_products_slug');
  if (!hasSlugIndex) {
    await connection.query('CREATE UNIQUE INDEX idx_products_slug ON products (slug)');
  }

  await connection.query(`UPDATE products SET
    name = COALESCE(name, title),
    slug = COALESCE(slug, LOWER(REPLACE(REPLACE(COALESCE(name, title), ' ', '-'), '--', '-'))),
    game_title = COALESCE(game_title, COALESCE(name, title)),
    status = COALESCE(status, CASE WHEN is_active = true THEN 'active' ELSE 'draft' END)`);

  await connection.query('UPDATE categories SET is_active = COALESCE(is_active, true)');
  await connection.query('UPDATE product_images SET is_primary = COALESCE(is_primary, false), sort_order = COALESCE(sort_order, 0)');
  await connection.query('UPDATE reviews SET is_verified_purchase = COALESCE(is_verified_purchase, false), is_approved = COALESCE(is_approved, true), helpful_count = COALESCE(helpful_count, 0)');
};

export const ensureDatabaseSchema = async (): Promise<void> => {
  const adminConnection = await mysql.createConnection({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    multipleStatements: true,
  });

  try {
    await adminConnection.query(
      `CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );

    await adminConnection.query(`USE \`${dbConfig.database}\``);

    const schemaSql = await fs.readFile(resolveSchemaPath(), 'utf8');
    await adminConnection.query(schemaSql);
    await ensureUserExtensions(adminConnection);
    await ensureCatalogExtensions(adminConnection);
  } finally {
    await adminConnection.end();
  }
};
