import { Request, Response } from 'express';
import { PromotionService } from '../services/promotion-service';
import { ValidatePromotionRequest } from '../types/promotion';
import { ApiError } from '../utils/api-error';
import { ApiResponse } from '../utils/api-response';
import { asyncHandler } from '../utils/async-handler';

export class PromotionController {
  static getAll = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
    const promotions = await PromotionService.getPromotions();
    res.json(new ApiResponse('Promotions loaded', promotions));
  });

  static getActive = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
    const promotions = await PromotionService.getActivePromotions();
    res.json(new ApiResponse('Active promotions loaded', promotions));
  });

  static validate = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const payload = req.body as ValidatePromotionRequest;
    if (!payload.code || payload.orderAmount === undefined) throw ApiError.badRequest('Code and orderAmount are required');
    const result = await PromotionService.validatePromotion(payload);
    res.json(new ApiResponse('Promotion validated', result));
  });
}
