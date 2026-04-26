import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import accountRoutes from './routes/accountRoutes';
import adminRoutes from './routes/admin-routes';
import authRoutes from './routes/auth-routes';
import categoryRoutes from './routes/category-routes';
import orderRoutes from './routes/order-routes';
import productRoutes from './routes/product-routes';
import promotionRoutes from './routes/promotion-routes';
import reviewRoutes from './routes/review-routes';
import pool from './config/database';
import { errorHandler } from './middleware/error-handler';

export const createApp = () => {
  const app = express();
  const isDevelopment = (process.env.NODE_ENV || 'development') !== 'production';
  const allowedOrigins = new Set([
    process.env.FRONTEND_URL || 'http://localhost:5173',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
  ]);

  app.use(helmet());
  app.use(cors({
    origin: (origin, callback) => {
      if (isDevelopment || !origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/api/accounts', accountRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/categories', categoryRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/reviews', reviewRoutes);
  app.use('/api/orders', orderRoutes);
  app.use('/api/promotions', promotionRoutes);
  app.use('/api/admin', adminRoutes);

  app.get('/api/health', async (_req, res) => {
    try {
      await pool.query('SELECT 1');
      res.json({ success: true, message: 'Server is running', data: { database: 'connected' } });
    } catch {
      res.status(500).json({ success: false, message: 'Database connection failed' });
    }
  });

  app.use(errorHandler);

  return app;
};
