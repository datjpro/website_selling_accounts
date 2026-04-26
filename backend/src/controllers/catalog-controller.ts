import { Request, Response } from 'express';
import { CategoryService, ProductService, ReviewService } from '../services/catalog-service';
import { ProductFilters, CreateReviewDto } from '../types/catalog';

export class CategoryController {
  static async getAll(_req: Request, res: Response): Promise<void> {
    try {
      const categories = await CategoryService.getAll();
      res.json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({ error: 'Failed to fetch categories' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        res.status(400).json({ error: 'Invalid category id' });
        return;
      }

      const category = await CategoryService.getById(id);
      if (!category) {
        res.status(404).json({ error: 'Category not found' });
        return;
      }

      res.json(category);
    } catch (error) {
      console.error('Error fetching category by id:', error);
      res.status(500).json({ error: 'Failed to fetch category' });
    }
  }

  static async getBySlug(req: Request, res: Response): Promise<void> {
    try {
      const category = await CategoryService.getBySlug(req.params.slug);
      if (!category) {
        res.status(404).json({ error: 'Category not found' });
        return;
      }

      res.json(category);
    } catch (error) {
      console.error('Error fetching category by slug:', error);
      res.status(500).json({ error: 'Failed to fetch category' });
    }
  }
}

export class ProductController {
  static async getMany(req: Request, res: Response): Promise<void> {
    try {
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
      res.json(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  }

  static async getById(req: Request, res: Response): Promise<void> {
    try {
      const product = await ProductService.getById(req.params.id);
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }

      res.json(product);
    } catch (error) {
      console.error('Error fetching product by id:', error);
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  }

  static async getBySlug(req: Request, res: Response): Promise<void> {
    try {
      const product = await ProductService.getBySlug(req.params.slug);
      if (!product) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }

      res.json(product);
    } catch (error) {
      console.error('Error fetching product by slug:', error);
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  }

  static async getFeatured(req: Request, res: Response): Promise<void> {
    try {
      const limit = req.query.limit ? Number(req.query.limit) : 6;
      const products = await ProductService.getFeatured(limit);
      res.json(products);
    } catch (error) {
      console.error('Error fetching featured products:', error);
      res.status(500).json({ error: 'Failed to fetch featured products' });
    }
  }

  static async getRelated(req: Request, res: Response): Promise<void> {
    try {
      const limit = req.query.limit ? Number(req.query.limit) : 4;
      const products = await ProductService.getRelated(req.params.productId, limit);
      res.json(products);
    } catch (error) {
      console.error('Error fetching related products:', error);
      res.status(500).json({ error: 'Failed to fetch related products' });
    }
  }

  static async search(req: Request, res: Response): Promise<void> {
    try {
      const q = typeof req.query.q === 'string' ? req.query.q.trim() : '';
      if (!q) {
        res.json([]);
        return;
      }

      const products = await ProductService.search(q);
      res.json(products);
    } catch (error) {
      console.error('Error searching products:', error);
      res.status(500).json({ error: 'Failed to search products' });
    }
  }
}

export class ReviewController {
  static async getProductReviews(req: Request, res: Response): Promise<void> {
    try {
      const reviews = await ReviewService.getProductReviews(req.params.productId);
      res.json(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  }

  static async create(req: Request, res: Response): Promise<void> {
    try {
      const payload = req.body as CreateReviewDto;
      if (!payload.productId || !payload.comment || !payload.rating) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }
      if (payload.rating < 1 || payload.rating > 5) {
        res.status(400).json({ error: 'Rating must be between 1 and 5' });
        return;
      }

      const review = await ReviewService.createReview(payload);
      if (!review) {
        res.status(500).json({ error: 'Failed to create review' });
        return;
      }

      res.status(201).json(review);
    } catch (error) {
      console.error('Error creating review:', error);
      res.status(500).json({ error: 'Failed to create review' });
    }
  }

  static async markHelpful(req: Request, res: Response): Promise<void> {
    try {
      const reviewId = Number(req.params.reviewId);
      if (Number.isNaN(reviewId)) {
        res.status(400).json({ error: 'Invalid review id' });
        return;
      }

      await ReviewService.markHelpful(reviewId);
      res.status(204).send();
    } catch (error) {
      console.error('Error marking helpful:', error);
      res.status(500).json({ error: 'Failed to mark review helpful' });
    }
  }
}
