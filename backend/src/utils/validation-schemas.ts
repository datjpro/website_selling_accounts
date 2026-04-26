import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(128),
});

export const registerSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
  password: z.string().min(8).max(128),
  fullName: z.string().min(1).max(100).optional(),
  phone: z.string().max(30).optional(),
});

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(6).max(128),
  newPassword: z.string().min(8).max(128),
});

export const updateProfileSchema = z.object({
  fullName: z.string().min(1).max(100).optional(),
  phone: z.string().max(30).optional(),
  avatarUrl: z.string().url().optional(),
}).refine((payload) => Object.keys(payload).length > 0, {
  message: 'At least one field is required',
});

export const promotionValidateSchema = z.object({
  code: z.string().min(1).max(50),
  orderAmount: z.number().positive(),
  userId: z.string().uuid().optional(),
});

export const orderItemSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive().max(100),
});

export const createOrderSchema = z.object({
  customerName: z.string().min(1).max(255),
  customerEmail: z.string().email(),
  customerPhone: z.string().max(30).optional(),
  paymentMethod: z.string().min(1).max(50),
  customerNote: z.string().max(1000).optional(),
  items: z.array(orderItemSchema).min(1),
  promotionCode: z.string().min(1).max(50).optional(),
});

export const createReviewSchema = z.object({
  productId: z.string().uuid(),
  userId: z.string().uuid().optional(),
  orderId: z.string().uuid().optional(),
  rating: z.number().int().min(1).max(5),
  title: z.string().max(255).optional(),
  comment: z.string().min(1).max(2000),
});

export const markHelpfulSchema = z.object({
  reviewId: z.coerce.number().int().positive(),
});

export const categoryIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const promotionIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});
