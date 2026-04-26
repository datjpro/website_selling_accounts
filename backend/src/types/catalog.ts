export interface CategoryResponse {
  id: number;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  iconUrl?: string;
  isActive: boolean;
}

export interface ProductImageResponse {
  id: number;
  productId: string;
  imageUrl: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface ProductResponse {
  id: string;
  categoryId: number | null;
  name: string;
  slug: string;
  gameTitle: string;
  description: string;
  price: number;
  originalPrice?: number | null;
  discountPercent: number;
  rankLevel?: string | null;
  serverRegion?: string | null;
  accountType?: string | null;
  hasEmail: boolean;
  hasPhone: boolean;
  stockQuantity: number;
  soldCount: number;
  status: 'active' | 'sold' | 'out_of_stock' | 'draft';
  isFeatured: boolean;
  isHot: boolean;
  badge?: string | null;
  ratingAverage: number;
  ratingCount: number;
  images: ProductImageResponse[];
  category?: CategoryResponse | null;
  createdAt: string;
}

export interface ProductsResponse {
  products: ProductResponse[];
  total: number;
  page: number;
  totalPages: number;
}

export interface ProductFilters {
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  isFeatured?: boolean;
  isHot?: boolean;
  status?: string;
  sortBy?: 'price' | 'rating' | 'newest' | 'popular';
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export interface ReviewResponse {
  id: number;
  productId: string;
  userId: string;
  orderId?: string | null;
  rating: number;
  title?: string | null;
  comment?: string | null;
  isVerifiedPurchase: boolean;
  isApproved: boolean;
  helpfulCount: number;
  userName?: string | null;
  userAvatar?: string | null;
  createdAt: string;
}

export interface CreateReviewDto {
  productId: string;
  userId?: string;
  orderId?: string;
  rating: number;
  title?: string;
  comment: string;
}
