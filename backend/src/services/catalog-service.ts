import { CategoryRepository, ProductRepository, ReviewRepository } from '../repositories/catalog-repository';
import {
  CategoryResponse,
  CreateReviewDto,
  ProductFilters,
  ProductImageResponse,
  ProductResponse,
  ProductsResponse,
  ReviewResponse,
} from '../types/catalog';
import { RowDataPacket } from 'mysql2';

const mapCategory = (row: RowDataPacket): CategoryResponse => ({
  id: Number(row.id),
  name: row.name,
  slug: row.slug,
  description: row.description ?? undefined,
  imageUrl: row.image_url ?? undefined,
  iconUrl: row.icon_url ?? undefined,
  isActive: Boolean(row.is_active),
});

const mapImage = (row: RowDataPacket): ProductImageResponse => ({
  id: Number(row.id),
  productId: row.product_id,
  imageUrl: row.image_url,
  isPrimary: Boolean(row.is_primary),
  sortOrder: Number(row.sort_order ?? 0),
});

const mapProduct = (row: RowDataPacket, images: ProductImageResponse[] = []): ProductResponse => ({
  id: row.id,
  categoryId: row.category_id !== null ? Number(row.category_id) : null,
  name: row.name,
  slug: row.slug,
  gameTitle: row.game_title,
  description: row.description ?? '',
  price: Number(row.price),
  originalPrice: row.original_price !== null ? Number(row.original_price) : null,
  discountPercent: Number(row.discount_percent ?? 0),
  rankLevel: row.rank_level ?? undefined,
  serverRegion: row.server_region ?? undefined,
  accountType: row.account_type ?? undefined,
  hasEmail: Boolean(row.has_email),
  hasPhone: Boolean(row.has_phone),
  stockQuantity: Number(row.stock_quantity ?? 0),
  soldCount: Number(row.sold_count ?? 0),
  status: row.status,
  isFeatured: Boolean(row.is_featured),
  isHot: Boolean(row.is_hot),
  badge: row.badge ?? undefined,
  ratingAverage: Number(row.rating_average ?? 0),
  ratingCount: Number(row.rating_count ?? 0),
  images,
  category: row.category_ref_id
    ? {
        id: Number(row.category_ref_id),
        name: row.category_name,
        slug: row.category_slug,
        description: row.category_description ?? undefined,
        imageUrl: row.category_image_url ?? undefined,
        iconUrl: row.category_icon_url ?? undefined,
        isActive: Boolean(row.category_is_active),
      }
    : null,
  createdAt: new Date(row.created_at).toISOString(),
});

const mapReview = (row: RowDataPacket): ReviewResponse => ({
  id: Number(row.id),
  productId: row.product_id,
  userId: row.user_id,
  orderId: row.order_id ?? undefined,
  rating: Number(row.rating),
  title: row.title ?? undefined,
  comment: row.comment ?? undefined,
  isVerifiedPurchase: Boolean(row.is_verified_purchase),
  isApproved: Boolean(row.is_approved),
  helpfulCount: Number(row.helpful_count ?? 0),
  userName: row.user_name ?? undefined,
  userAvatar: undefined,
  createdAt: new Date(row.created_at).toISOString(),
});

export class CategoryService {
  static async getAll(): Promise<CategoryResponse[]> {
    const rows = await CategoryRepository.findAll();
    return rows.map(mapCategory);
  }

  static async getById(id: number): Promise<CategoryResponse | null> {
    const row = await CategoryRepository.findById(id);
    return row ? mapCategory(row) : null;
  }

  static async getBySlug(slug: string): Promise<CategoryResponse | null> {
    const row = await CategoryRepository.findBySlug(slug);
    return row ? mapCategory(row) : null;
  }
}

export class ProductService {
  static async getMany(filters: ProductFilters): Promise<ProductsResponse> {
    const { rows, total } = await ProductRepository.findMany(filters);
    const products = rows.map((row) => {
      const images: ProductImageResponse[] = row.image_id
        ? [
            {
              id: Number(row.image_id),
              productId: row.image_product_id,
              imageUrl: row.image_url,
              isPrimary: Boolean(row.is_primary),
              sortOrder: Number(row.sort_order ?? 0),
            },
          ]
        : [];
      return mapProduct(row, images);
    });

    const page = filters.page ?? 1;
    const limit = filters.limit ?? 12;
    return {
      products,
      total,
      page,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    };
  }

  static async getById(id: string): Promise<ProductResponse | null> {
    const row = await ProductRepository.findById(id);
    if (!row) return null;
    const imageRows = await ProductRepository.findImages(id);
    return mapProduct(row, imageRows.map(mapImage));
  }

  static async getBySlug(slug: string): Promise<ProductResponse | null> {
    const row = await ProductRepository.findBySlug(slug);
    if (!row) return null;
    const imageRows = await ProductRepository.findImages(row.id);
    return mapProduct(row, imageRows.map(mapImage));
  }

  static async getFeatured(limit: number): Promise<ProductResponse[]> {
    const rows = await ProductRepository.findFeatured(limit);
    return rows.map((row) => {
      const images: ProductImageResponse[] = row.image_id
        ? [{ id: Number(row.image_id), productId: row.image_product_id, imageUrl: row.image_url, isPrimary: Boolean(row.is_primary), sortOrder: Number(row.sort_order ?? 0) }]
        : [];
      return mapProduct(row, images);
    });
  }

  static async getRelated(productId: string, limit: number): Promise<ProductResponse[]> {
    const rows = await ProductRepository.findRelated(productId, limit);
    return rows.map((row) => {
      const images: ProductImageResponse[] = row.image_id
        ? [{ id: Number(row.image_id), productId: row.image_product_id, imageUrl: row.image_url, isPrimary: Boolean(row.is_primary), sortOrder: Number(row.sort_order ?? 0) }]
        : [];
      return mapProduct(row, images);
    });
  }

  static async search(query: string): Promise<ProductResponse[]> {
    const rows = await ProductRepository.search(query);
    return rows.map((row) => {
      const images: ProductImageResponse[] = row.image_id
        ? [{ id: Number(row.image_id), productId: row.image_product_id, imageUrl: row.image_url, isPrimary: Boolean(row.is_primary), sortOrder: Number(row.sort_order ?? 0) }]
        : [];
      return mapProduct(row, images);
    });
  }
}

export class ReviewService {
  static async getProductReviews(productId: string): Promise<ReviewResponse[]> {
    const rows = await ReviewRepository.findByProductId(productId);
    return rows.map(mapReview);
  }

  static async createReview(payload: CreateReviewDto): Promise<ReviewResponse | null> {
    const userId = payload.userId ?? null;
    const reviewId = await ReviewRepository.create({
      productId: payload.productId,
      userId,
      orderId: payload.orderId,
      rating: payload.rating,
      title: payload.title,
      comment: payload.comment,
    });
    await ReviewRepository.refreshProductRating(payload.productId);
    const created = await ReviewRepository.findById(reviewId);
    return created ? mapReview(created) : null;
  }

  static async markHelpful(reviewId: number): Promise<void> {
    await ReviewRepository.incrementHelpful(reviewId);
  }
}

