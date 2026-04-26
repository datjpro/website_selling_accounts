export interface PromotionResponse {
  id: number;
  code: string;
  title: string;
  description?: string;
  discountType: 'percentage' | 'fixed' | 'gift';
  discountValue: number;
  minOrderAmount: number;
  maxDiscountAmount?: number;
  usageLimit?: number;
  usageCount: number;
  usagePerUser: number;
  isActive: boolean;
  badge?: string;
  startDate?: string;
  endDate?: string;
}

export interface ValidatePromotionRequest {
  code: string;
  orderAmount: number;
  userId?: string;
}

export interface ValidatePromotionResponse {
  valid: boolean;
  promotion?: PromotionResponse;
  discountAmount?: number;
  message?: string;
}
