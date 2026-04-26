import fs from 'fs/promises';
import path from 'path';
import mysql from 'mysql2/promise';
import { dbConfig } from '../config/database';

const resolveSchemaPath = (): string => {
  const fromWorkspace = path.resolve(process.cwd(), 'src/database/mysql_init.sql');
  return fromWorkspace;
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

    const schemaPath = resolveSchemaPath();
    const schemaSql = await fs.readFile(schemaPath, 'utf8');

    await adminConnection.query(schemaSql);
  } finally {
    await adminConnection.end();
  }
};
