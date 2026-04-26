import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import accountRoutes from './routes/accountRoutes';
import authRoutes from './routes/auth-routes';
import categoryRoutes from './routes/category-routes';
import productRoutes from './routes/product-routes';
import reviewRoutes from './routes/review-routes';
import pool from './config/database';
import { ensureDatabaseSchema } from './database/schema-init';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/accounts', accountRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'OK', message: 'Server is running', database: 'connected' });
  } catch {
    res.status(500).json({ status: 'ERROR', message: 'Database connection failed', database: 'disconnected' });
  }
});

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

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

void startServer();

export default app;
