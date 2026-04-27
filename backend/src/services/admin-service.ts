import { RowDataPacket } from 'mysql2';
import { AdminRepository } from '../repositories/admin-repository';
import { CategoryService, ProductService } from './catalog-service';
import { PromotionService } from './promotion-service';
import { OrderService } from './order-service';

const mapAdminUser = (row: RowDataPacket) => ({
  id: row.id,
  username: row.username,
  email: row.email,
  fullName: row.full_name ?? undefined,
  phone: row.phone ?? undefined,
  avatarUrl: row.avatar_url ?? undefined,
  role: row.role,
  status: row.status,
  balance: Number(row.balance ?? 0),
  totalSpent: Number(row.total_spent ?? 0),
  totalOrders: Number(row.total_orders ?? 0),
  createdAt: new Date(row.created_at).toISOString(),
});

const mapAdminProduct = (row: RowDataPacket) => ({
  id: row.id,
  categoryId: row.category_id !== null ? Number(row.category_id) : null,
  name: row.name,
  slug: row.slug,
  gameTitle: row.game_title,
  description: row.description ?? '',
  price: Number(row.price ?? 0),
  originalPrice: row.original_price !== null ? Number(row.original_price) : null,
  discountPercent: 0,
  rankLevel: undefined,
  serverRegion: undefined,
  accountType: undefined,
  hasEmail: false,
  hasPhone: false,
  stockQuantity: Number(row.stock_quantity ?? 0),
  soldCount: Number(row.sold_count ?? 0),
  status: row.status,
  isFeatured: Boolean(row.is_featured),
  isHot: Boolean(row.is_hot),
  badge: row.badge ?? undefined,
  ratingAverage: 0,
  ratingCount: 0,
  images: [],
  category: row.category_id
    ? {
        id: Number(row.category_id),
        name: row.category_name,
        slug: row.category_slug,
        isActive: true,
      }
    : null,
  createdAt: new Date(row.created_at).toISOString(),
});

const mapAdminOrder = (row: RowDataPacket) => ({
  id: row.id,
  orderNumber: row.order_number,
  userId: row.user_id ?? undefined,
  customerName: row.customer_name,
  customerEmail: row.customer_email,
  finalAmount: Number(row.final_amount ?? 0),
  status: row.status,
  paymentStatus: row.payment_status,
  createdAt: new Date(row.created_at).toISOString(),
});

export class AdminService {
  static async listUsers() {
    const rows = await AdminRepository.listUsers();
    return rows.map(mapAdminUser);
  }

  static async listCategories() {
    return CategoryService.getAll();
  }

  static async listProducts() {
    const rows = await AdminRepository.listProducts();
    return rows.map(mapAdminProduct);
  }

  static async listOrders() {
    const rows = await AdminRepository.listOrders();
    return rows.map(mapAdminOrder);
  }

  static async listPromotions() {
    return PromotionService.getPromotions();
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
