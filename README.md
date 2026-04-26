# ShopAcc

ShopAcc là nền tảng bán tài khoản game trực tuyến.

## Trạng thái hiện tại
- Frontend có thể chạy bằng Docker hoặc Vite local ở `http://localhost:5173`
- Backend chạy local bằng `npm start` hoặc `npm run dev` ở `http://localhost:3000`
- MySQL chạy sẵn trên máy host ở `localhost:3306`
- Database hiện dùng là `shopacc_mysql`
- Backend local tự tạo database và tự chạy `backend/src/database/mysql_init.sql` khi khởi động để đảm bảo đủ schema nền tảng

## Cấu trúc dự án
- `frontend/`: ứng dụng React + Vite
- `backend/`: API Express + TypeScript + MySQL
- `docs/`: tài liệu kiến trúc, flow, convention, roadmap
- `docker-compose.yml`: cấu hình chạy frontend bằng Docker nếu cần

## Khởi động nhanh
### Yêu cầu
- Node.js 22+
- MySQL local đang chạy ở `localhost:3306`
- Tài khoản MySQL dev: `root / 123456`

### Chạy backend
```bash
cd backend
npm install
npm run build
npm start
```

### Chạy frontend
```bash
cd frontend
npm install
npm run dev
```

### Truy cập
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000/api`
- Health check: `http://localhost:3000/api/health`

## Backend hiện có
- `GET /api/health`
- `GET /api/accounts`
- `GET /api/accounts/:id`
- `POST /api/accounts`
- `PUT /api/accounts/:id`
- `DELETE /api/accounts/:id`
- `GET /api/categories`
- `GET /api/categories/:id`
- `GET /api/categories/slug/:slug`
- `GET /api/products`
- `GET /api/products/:id`
- `GET /api/products/slug/:slug`
- `GET /api/products/featured`
- `GET /api/products/:productId/related`
- `GET /api/products/search`
- `GET /api/reviews/product/:productId`
- `POST /api/reviews`
- `POST /api/reviews/:reviewId/helpful`\n- `GET /api/promotions`\n- `GET /api/promotions/active`\n- `POST /api/promotions/validate`\n- `POST /api/orders`\n- `GET /api/orders/my-orders`\n- `GET /api/orders/:id`\n- `GET /api/orders/number/:orderNumber`\n- `POST /api/orders/:id/cancel`

## Database
Nguồn sự thật cho schema và setup:
- `backend/DATABASE_SCHEMA.md`
- `backend/DATABASE_SETUP.md`

## Ghi chú
- Backend không chạy bằng Docker cho cổng `3000` ở trạng thái hiện tại.
- Backend local sẽ tự đảm bảo DB `shopacc_mysql` tồn tại và đủ schema Catalog hiện tại.
- Roadmap API tiếp theo nằm ở `docs/api-roadmap.md`.

