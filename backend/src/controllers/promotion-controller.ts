import { Request, Response } from 'express';
import { PromotionService } from '../services/promotion-service';
import { ValidatePromotionRequest } from '../types/promotion';

export class PromotionController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const promotions = await PromotionService.getPromotions();
      res.json(promotions);
    } catch (error) {
      console.error('Error fetching promotions:', error);
      res.status(500).json({ error: 'Failed to fetch promotions' });
    }
  }

  static async getActive(_req: Request, res: Response): Promise<void> {
    try {
      const promotions = await PromotionService.getActivePromotions();
      res.json(promotions);
    } catch (error) {
      console.error('Error fetching active promotions:', error);
      res.status(500).json({ error: 'Failed to fetch active promotions' });
    }
  }

  static async validate(req: Request, res: Response): Promise<void> {
    try {
      const payload = req.body as ValidatePromotionRequest;
      if (!payload.code || payload.orderAmount === undefined) {
        res.status(400).json({ valid: false, message: 'Code and orderAmount are required' });
        return;
      }

      const result = await PromotionService.validatePromotion(payload);
      res.json(result);
    } catch (error) {
      console.error('Error validating promotion:', error);
      res.status(500).json({ valid: false, message: 'Failed to validate promotion' });
    }
  }
}
