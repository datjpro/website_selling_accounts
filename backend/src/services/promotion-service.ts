import { PromotionRepository } from '../repositories/promotion-repository';
import { PromotionResponse, ValidatePromotionRequest, ValidatePromotionResponse } from '../types/promotion';
import { RowDataPacket } from 'mysql2';

const mapPromotion = (row: RowDataPacket): PromotionResponse => ({
  id: Number(row.id),
  code: row.code,
  title: row.title ?? row.code,
  description: row.description ?? undefined,
  discountType: row.discount_type,
  discountValue: Number(row.discount_value ?? row.discount_percent ?? 0),
  minOrderAmount: Number(row.min_order_amount ?? 0),
  maxDiscountAmount: row.max_discount_amount !== null ? Number(row.max_discount_amount) : undefined,
  usageLimit: row.usage_limit !== null ? Number(row.usage_limit) : undefined,
  usageCount: Number(row.usage_count ?? 0),
  usagePerUser: Number(row.usage_per_user ?? 1),
  isActive: Boolean(row.is_active),
  badge: row.badge ?? undefined,
  startDate: row.start_date ? new Date(row.start_date).toISOString() : undefined,
  endDate: row.end_date ? new Date(row.end_date).toISOString() : (row.valid_until ? new Date(row.valid_until).toISOString() : undefined),
});

export class PromotionService {
  static async getPromotions(): Promise<PromotionResponse[]> {
    const rows = await PromotionRepository.findAll();
    return rows.map(mapPromotion);
  }

  static async getActivePromotions(): Promise<PromotionResponse[]> {
    const rows = await PromotionRepository.findActive();
    return rows.map(mapPromotion);
  }

  static async validatePromotion(payload: ValidatePromotionRequest): Promise<ValidatePromotionResponse> {
    const code = payload.code.trim();
    if (!code) {
      return { valid: false, message: 'Promotion code is required' };
    }

    const row = await PromotionRepository.findByCode(code);
    if (!row) {
      return { valid: false, message: 'Promotion code not found' };
    }

    const promotion = mapPromotion(row);
    if (!promotion.isActive) {
      return { valid: false, message: 'Promotion is inactive' };
    }

    const now = new Date();
    if (promotion.startDate && new Date(promotion.startDate) > now) {
      return { valid: false, message: 'Promotion has not started yet' };
    }
    if (promotion.endDate && new Date(promotion.endDate) < now) {
      return { valid: false, message: 'Promotion has expired' };
    }
    if (promotion.usageLimit !== undefined && promotion.usageCount >= promotion.usageLimit) {
      return { valid: false, message: 'Promotion usage limit reached' };
    }
    if (payload.orderAmount < promotion.minOrderAmount) {
      return {
        valid: false,
        message: `Minimum order amount is ${promotion.minOrderAmount}`,
      };
    }

    let discountAmount = 0;
    if (promotion.discountType === 'percentage') {
      discountAmount = (payload.orderAmount * promotion.discountValue) / 100;
      if (promotion.maxDiscountAmount !== undefined) {
        discountAmount = Math.min(discountAmount, promotion.maxDiscountAmount);
      }
    } else if (promotion.discountType === 'fixed') {
      discountAmount = promotion.discountValue;
    }

    discountAmount = Math.max(0, Math.min(discountAmount, payload.orderAmount));

    return {
      valid: true,
      promotion,
      discountAmount,
      message: 'Promotion applied successfully',
    };
  }
}
