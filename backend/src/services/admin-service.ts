import { AdminRepository } from '../repositories/admin-repository';
import { CategoryService, ProductService } from './catalog-service';
import { PromotionService } from './promotion-service';
import { OrderService } from './order-service';

export class AdminService {
  static async listUsers() {
    return AdminRepository.listUsers();
  }

  static async createCategory(payload: Parameters<typeof AdminRepository.createCategory>[0]) {
    const id = await AdminRepository.createCategory(payload);
    return CategoryService.getById(id);
  }

  static async updateCategory(id: number, payload: Parameters<typeof AdminRepository.updateCategory>[1]) {
    await AdminRepository.updateCategory(id, payload);
    return CategoryService.getById(id);
  }

  static async deleteCategory(id: number) {
    await AdminRepository.deleteCategory(id);
  }

  static async createProduct(payload: Parameters<typeof AdminRepository.createProduct>[0]) {
    const id = await AdminRepository.createProduct(payload);
    return ProductService.getById(id);
  }

  static async updateProduct(id: string, payload: Parameters<typeof AdminRepository.updateProduct>[1]) {
    await AdminRepository.updateProduct(id, payload);
    return ProductService.getById(id);
  }

  static async deleteProduct(id: string) {
    await AdminRepository.deleteProduct(id);
  }

  static async createPromotion(payload: Parameters<typeof AdminRepository.createPromotion>[0]) {
    await AdminRepository.createPromotion(payload);
    return PromotionService.getPromotions();
  }

  static async updatePromotion(id: number, payload: Parameters<typeof AdminRepository.updatePromotion>[1]) {
    await AdminRepository.updatePromotion(id, payload);
    return PromotionService.getPromotions();
  }

  static async deletePromotion(id: number) {
    await AdminRepository.deletePromotion(id);
  }

  static async updateOrderStatus(id: string, status: string, paymentStatus?: string) {
    await AdminRepository.updateOrderStatus(id, status, paymentStatus);
    return OrderService.getOrderById(id);
  }
}
