import { Response } from 'express';
import { OrderService } from '../services/order-service';
import { AuthenticatedRequest } from '../middleware/require-auth';
import { CreateOrderDto } from '../types/order';

export class OrderController {
  static async create(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const payload = req.body as CreateOrderDto;
      if (!payload.customerName || !payload.customerEmail || !payload.paymentMethod || !payload.items?.length) {
        res.status(400).json({ error: 'Missing required order fields' });
        return;
      }

      const order = await OrderService.createOrder(payload, req.user?.id);
      res.status(201).json(order);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create order';
      res.status(400).json({ error: message });
    }
  }

  static async getMyOrders(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user?.id) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
      }

      const orders = await OrderService.getMyOrders(req.user.id);
      res.json(orders);
    } catch (error) {
      console.error('Error fetching my orders:', error);
      res.status(500).json({ error: 'Failed to fetch orders' });
    }
  }

  static async getById(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const order = await OrderService.getOrderById(req.params.id);
      if (!order) {
        res.status(404).json({ error: 'Order not found' });
        return;
      }
      res.json(order);
    } catch (error) {
      console.error('Error fetching order by id:', error);
      res.status(500).json({ error: 'Failed to fetch order' });
    }
  }

  static async getByNumber(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const order = await OrderService.getOrderByNumber(req.params.orderNumber);
      if (!order) {
        res.status(404).json({ error: 'Order not found' });
        return;
      }
      res.json(order);
    } catch (error) {
      console.error('Error fetching order by number:', error);
      res.status(500).json({ error: 'Failed to fetch order' });
    }
  }

  static async cancel(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      const order = await OrderService.cancelOrder(req.params.id, req.user?.id);
      if (!order) {
        res.status(404).json({ error: 'Order not found' });
        return;
      }
      res.json(order);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to cancel order';
      const status = message === 'Forbidden' ? 403 : 400;
      res.status(status).json({ error: message });
    }
  }
}
