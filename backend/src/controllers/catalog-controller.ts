import { Request, Response } from 'express';
import { CategoryService, ProductService, ReviewService } from '../services/catalog-service';
import { ProductFilters, CreateReviewDto } from '../types/catalog';
import { ApiError } from '../utils/api-error';
import { ApiResponse } from '../utils/api-response';
import { asyncHandler } from '../utils/async-handler';

export class CategoryController {
  static getAll = asyncHandler(async (_req: Request, res: Response): Promise<void> => {
    const categories = await CategoryService.getAll();
    res.json(new ApiResponse('Categories loaded', categories));
  });

  static getById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) throw ApiError.badRequest('Invalid category id');
    const category = await CategoryService.getById(id);
    if (!category) throw ApiError.notFound('Category not found');
    res.json(new ApiResponse('Category loaded', category));
  });

  static getBySlug = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const category = await CategoryService.getBySlug(req.params.slug);
    if (!category) throw ApiError.notFound('Category not found');
    res.json(new ApiResponse('Category loaded', category));
  });
}

export class ProductController {
  static getMany = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const filters: ProductFilters = {
      categoryId: req.query.categoryId ? Number(req.query.categoryId) : undefined,
      minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
      maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
      search: typeof req.query.search === 'string' ? req.query.search : undefined,
      isFeatured: req.query.isFeatured !== undefined ? req.query.isFeatured === 'true' : undefined,
      isHot: req.query.isHot !== undefined ? req.query.isHot === 'true' : undefined,
      status: typeof req.query.status === 'string' ? req.query.status : undefined,
      sortBy: typeof req.query.sortBy === 'string' ? (req.query.sortBy as ProductFilters['sortBy']) : undefined,
      sortOrder: typeof req.query.sortOrder === 'string' ? (req.query.sortOrder as ProductFilters['sortOrder']) : undefined,
      page: req.query.page ? Number(req.query.page) : undefined,
      limit: req.query.limit ? Number(req.query.limit) : undefined,
    };
    const data = await ProductService.getMany(filters);
    res.json(new ApiResponse('Products loaded', data));
  });

  static getById = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const product = await ProductService.getById(req.params.id);
    if (!product) throw ApiError.notFound('Product not found');
    res.json(new ApiResponse('Product loaded', product));
  });

  static getBySlug = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const product = await ProductService.getBySlug(req.params.slug);
    if (!product) throw ApiError.notFound('Product not found');
    res.json(new ApiResponse('Product loaded', product));
  });

  static getFeatured = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const limit = req.query.limit ? Number(req.query.limit) : 6;
    const products = await ProductService.getFeatured(limit);
    res.json(new ApiResponse('Featured products loaded', products));
  });

  static getRelated = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const limit = req.query.limit ? Number(req.query.limit) : 4;
    const products = await ProductService.getRelated(req.params.productId, limit);
    res.json(new ApiResponse('Related products loaded', products));
  });

  static search = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const q = typeof req.query.q === 'string' ? req.query.q.trim() : '';
    if (!q) {
      res.json(new ApiResponse('Products search loaded', []));
      return;
    }
    const products = await ProductService.search(q);
    res.json(new ApiResponse('Products search loaded', products));
  });
}

export class ReviewController {
  static getProductReviews = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const reviews = await ReviewService.getProductReviews(req.params.productId);
    res.json(new ApiResponse('Reviews loaded', reviews));
  });

  static create = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const payload = req.body as CreateReviewDto;
    if (!payload.productId || !payload.comment || !payload.rating) throw ApiError.badRequest('Missing required fields');
    if (payload.rating < 1 || payload.rating > 5) throw ApiError.badRequest('Rating must be between 1 and 5');
    const review = await ReviewService.createReview(payload);
    if (!review) throw ApiError.internal('Failed to create review');
    res.status(201).json(new ApiResponse('Review created', review));
  });

  static markHelpful = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    const reviewId = Number(req.params.reviewId);
    if (Number.isNaN(reviewId)) throw ApiError.badRequest('Invalid review id');
    await ReviewService.markHelpful(reviewId);
    res.status(204).send();
  });
}
