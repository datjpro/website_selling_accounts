import apiClient from "./api";

export interface Promotion {
  id: number;
  code: string;
  title: string;
  description?: string;
  discountType: "percentage" | "fixed" | "gift";
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

export interface ValidatePromotionResponse {
  valid: boolean;
  promotion?: Promotion;
  discountAmount?: number;
  message?: string;
}

export const promotionService = {
  getPromotions: async (): Promise<Promotion[]> => {
    const response = await apiClient.get("/promotions");
    return response.data;
  },

  getActivePromotions: async (): Promise<Promotion[]> => {
    const response = await apiClient.get("/promotions/active");
    return response.data;
  },

  validatePromotion: async (
    code: string,
    orderAmount: number
  ): Promise<ValidatePromotionResponse> => {
    const response = await apiClient.post("/promotions/validate", {
      code,
      orderAmount,
    });
    return response.data;
  },
};
