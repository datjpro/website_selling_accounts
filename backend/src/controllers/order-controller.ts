import { Response } from 'express';
import { OrderService } from '../services/order-service';
import { AuthenticatedRequest } from '../middleware/require-auth';
import { CreateOrderDto } from '../types/order';
import { ApiError } from '../utils/api-error';
import { ApiResponse } from '../utils/api-response';
import { asyncHandler } from '../utils/async-handler';

export class OrderController {
  static create = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const payload = req.body as CreateOrderDto;
    if (!payload.customerName || !payload.customerEmail || !payload.paymentMethod || !payload.items?.length) {
      throw ApiError.badRequest('Missing required order fields');
    }
    const order = await OrderService.createOrder(payload, req.user?.id);
    res.status(201).json(new ApiResponse('Order created', order));
  });

  static getMyOrders = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    if (!req.user?.id) throw ApiError.unauthorized('Unauthorized');
    const orders = await OrderService.getMyOrders(req.user.id);
    res.json(new ApiResponse('Orders loaded', orders));
  });

  static getById = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const order = await OrderService.getOrderById(req.params.id);
    if (!order) throw ApiError.notFound('Order not found');
    res.json(new ApiResponse('Order loaded', order));
  });

  static getByNumber = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const order = await OrderService.getOrderByNumber(req.params.orderNumber);
    if (!order) throw ApiError.notFound('Order not found');
    res.json(new ApiResponse('Order loaded', order));
  });

  static cancel = asyncHandler(async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const order = await OrderService.cancelOrder(req.params.id, req.user?.id);
    if (!order) throw ApiError.notFound('Order not found');
    res.json(new ApiResponse('Order cancelled', order));
  });
}
