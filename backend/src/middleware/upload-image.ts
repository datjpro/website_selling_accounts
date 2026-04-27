import fs from 'fs';
import path from 'path';
import multer from 'multer';

const uploadsRoot = path.resolve(__dirname, '..', 'uploads');
const imagesRoot = path.join(uploadsRoot, 'images');

if (!fs.existsSync(imagesRoot)) {
  fs.mkdirSync(imagesRoot, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, imagesRoot);
  },
  filename: (_req, file, callback) => {
    const timestamp = Date.now();
    const random = Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname) || '.png';
    callback(null, `${timestamp}-${random}${extension}`);
  },
});

const imageMimeTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);

export const uploadImage = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (_req, file, callback) => {
    if (!imageMimeTypes.has(file.mimetype)) {
      callback(new Error('Only image files are allowed'));
      return;
    }
    callback(null, true);
  },
});

export const uploadPaths = {
  uploadsRoot,
  imagesRoot,
};

