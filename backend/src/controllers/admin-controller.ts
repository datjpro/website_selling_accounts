import { Request, Response } from 'express';
import { AdminService } from '../services/admin-service';
import { ApiError } from '../utils/api-error';
import { ApiResponse } from '../utils/api-response';
import { asyncHandler } from '../utils/async-handler';

export class AdminController {
  static listUsers = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
    const users = await AdminService.listUsers();
    res.json(new ApiResponse('Users loaded', users));
  });

  static createCategory = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    if (!req.body?.name || !req.body?.slug) throw ApiError.badRequest('Name and slug are required');
    const category = await AdminService.createCategory(req.body);
    res.status(201).json(new ApiResponse('Category created', category));
  });

  static updateCategory = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) throw ApiError.badRequest('Invalid category id');
    const category = await AdminService.updateCategory(id, req.body);
    res.json(new ApiResponse('Category updated', category));
  });

  static deleteCategory = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) throw ApiError.badRequest('Invalid category id');
    await AdminService.deleteCategory(id);
    res.status(204).send();
  });

  static createProduct = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    if (!req.body?.title || !req.body?.name || !req.body?.slug || !req.body?.gameTitle || req.body?.price === undefined) {
      throw ApiError.badRequest('Missing required product fields');
    }
    const product = await AdminService.createProduct(req.body);
    res.status(201).json(new ApiResponse('Product created', product));
  });

  static updateProduct = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const product = await AdminService.updateProduct(req.params.id, req.body);
    res.json(new ApiResponse('Product updated', product));
  });

  static deleteProduct = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    await AdminService.deleteProduct(req.params.id);
    res.status(204).send();
  });

  static createPromotion = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    if (!req.body?.code || !req.body?.title || !req.body?.discountType || req.body?.discountValue === undefined) {
      throw ApiError.badRequest('Missing required promotion fields');
    }
    const promotions = await AdminService.createPromotion(req.body);
    res.status(201).json(new ApiResponse('Promotion created', promotions));
  });

  static updatePromotion = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) throw ApiError.badRequest('Invalid promotion id');
    const promotions = await AdminService.updatePromotion(id, req.body);
    res.json(new ApiResponse('Promotion updated', promotions));
  });

  static deletePromotion = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) throw ApiError.badRequest('Invalid promotion id');
    await AdminService.deletePromotion(id);
    res.status(204).send();
  });

  static updateOrderStatus = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    if (!req.body?.status) throw ApiError.badRequest('Status is required');
    const order = await AdminService.updateOrderStatus(req.params.id, req.body.status, req.body.paymentStatus);
    res.json(new ApiResponse('Order updated', order));
  });
}
