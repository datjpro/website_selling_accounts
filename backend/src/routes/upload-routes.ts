import { Router, Request, Response } from 'express';
import { requireAuth } from '../middleware/require-auth';
import { uploadImage } from '../middleware/upload-image';
import { ApiResponse } from '../utils/api-response';
import { asyncHandler } from '../utils/async-handler';
import { ApiError } from '../utils/api-error';

const router = Router();

router.post(
  '/image',
  requireAuth,
  uploadImage.single('image'),
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    if (!req.file) {
      throw ApiError.badRequest('Image file is required');
    }

    const fileUrl = `/uploads/images/${req.file.filename}`;
    res.status(201).json(new ApiResponse('Image uploaded', { url: fileUrl }));
  })
);

export default router;
