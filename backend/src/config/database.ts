import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const databaseName = process.env.DB_NAME || 'shopacc_mysql';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  database: databaseName,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '123456',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  database: databaseName,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '123456',
};

export default pool;
