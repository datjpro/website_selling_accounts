import apiClient from "./api";

export interface Review {
  id: number;
  productId: number;
  userId: number;
  orderId?: number;
  rating: number;
  title?: string;
  comment?: string;
  isVerifiedPurchase: boolean;
  isApproved: boolean;
  helpfulCount: number;
  userName?: string;
  userAvatar?: string;
  createdAt: string;
}

export interface CreateReviewData {
  productId: number;
  orderId?: number;
  rating: number;
  title?: string;
  comment: string;
}

export const reviewService = {
  getProductReviews: async (productId: number): Promise<Review[]> => {
    const response = await apiClient.get(`/reviews/product/${productId}`);
    return response.data;
  },

  createReview: async (data: CreateReviewData): Promise<Review> => {
    const response = await apiClient.post("/reviews", data);
    return response.data;
  },

  markHelpful: async (reviewId: number): Promise<void> => {
    await apiClient.post(`/reviews/${reviewId}/helpful`);
  },
};
