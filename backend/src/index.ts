import dotenv from 'dotenv';
import pool from './config/database';
import { ensureDatabaseSchema } from './database/schema-init';
import { createApp } from './app';

dotenv.config();

const app = createApp();
const PORT = process.env.PORT || 3000;

const startServer = async (): Promise<void> => {
  try {
    await ensureDatabaseSchema();
    await pool.query('SELECT 1');
    console.log('Database connected successfully');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  }
};

if (require.main === module) {
  void startServer();
}

export default app;
