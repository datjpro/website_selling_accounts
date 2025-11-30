import apiClient from "./api";

export interface Product {
  id: number;
  categoryId: number;
  name: string;
  slug: string;
  gameTitle: string;
  description: string;
  price: number;
  originalPrice?: number;
  discountPercent: number;
  rankLevel?: string;
  serverRegion?: string;
  accountType?: string;
  hasEmail: boolean;
  hasPhone: boolean;
  stockQuantity: number;
  soldCount: number;
  status: "active" | "sold" | "out_of_stock" | "draft";
  isFeatured: boolean;
  isHot: boolean;
  badge?: string;
  ratingAverage: number;
  ratingCount: number;
  images: ProductImage[];
  category?: Category;
  createdAt: string;
}

export interface ProductImage {
  id: number;
  productId: number;
  imageUrl: string;
  isPrimary: boolean;
  sortOrder: number;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  iconUrl?: string;
  isActive: boolean;
}

export interface ProductFilters {
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  isFeatured?: boolean;
  isHot?: boolean;
  status?: string;
  sortBy?: "price" | "rating" | "newest" | "popular";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  totalPages: number;
}

export const productService = {
  getProducts: async (filters?: ProductFilters): Promise<ProductsResponse> => {
    const response = await apiClient.get("/products", { params: filters });
    return response.data;
  },

  getProductById: async (id: number): Promise<Product> => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },

  getProductBySlug: async (slug: string): Promise<Product> => {
    const response = await apiClient.get(`/products/slug/${slug}`);
    return response.data;
  },

  getFeaturedProducts: async (limit = 6): Promise<Product[]> => {
    const response = await apiClient.get("/products/featured", {
      params: { limit },
    });
    return response.data;
  },

  getRelatedProducts: async (
    productId: number,
    limit = 4
  ): Promise<Product[]> => {
    const response = await apiClient.get(`/products/${productId}/related`, {
      params: { limit },
    });
    return response.data;
  },

  searchProducts: async (query: string): Promise<Product[]> => {
    const response = await apiClient.get("/products/search", {
      params: { q: query },
    });
    return response.data;
  },
};

export const categoryService = {
  getCategories: async (): Promise<Category[]> => {
    const response = await apiClient.get("/categories");
    return response.data;
  },

  getCategoryById: async (id: number): Promise<Category> => {
    const response = await apiClient.get(`/categories/${id}`);
    return response.data;
  },

  getCategoryBySlug: async (slug: string): Promise<Category> => {
    const response = await apiClient.get(`/categories/slug/${slug}`);
    return response.data;
  },
};
