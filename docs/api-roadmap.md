# API Roadmap

## Mục tiêu
- Xây API theo hướng khớp với frontend hiện có.
- Ưu tiên triển khai Catalog trước.
- Chấp nhận việc schema 9 bảng hiện tại là nền khởi đầu và sẽ cần mở rộng ở phase implement.

## Current state vs target
- Frontend đang kỳ vọng contract giàu hơn schema backend hiện tại.
- Backend hiện mới có `accounts` và health endpoint.
- Cần chốt contract API trước khi mở rộng schema và code.

## Phase 1: Catalog
### Mục tiêu
Làm cụm `categories`, `products`, `product_images`, `reviews` để frontend listing/detail có thể hoạt động.

### Endpoint cần hỗ trợ
- `GET /products`
- `GET /products/:id`
- `GET /products/slug/:slug`
- `GET /products/featured`
- `GET /products/:productId/related`
- `GET /products/search`
- `GET /categories`
- `GET /categories/:id`
- `GET /categories/slug/:slug`
- `GET /reviews/product/:productId`
- `POST /reviews`
- `POST /reviews/:reviewId/helpful`

### Mở rộng schema tối thiểu dự kiến
- `categories`: bảo đảm có `id`, `name`, `slug`; mở rộng thêm field frontend cần dùng nếu cần.
- `products`: mở rộng để gần với contract trong `frontend/src/services/productService.ts`.
- `product_images`: chuẩn hóa để trả ảnh cho list/detail.
- `reviews`: hỗ trợ đọc theo sản phẩm và tạo review.

### Contract cần khóa
- Paging, filter, sort cho `GET /products`
- Shape của `Product`, `Category`, `ProductImage`, `Review`
- Cách trả `featured`, `related`, `search`
- Format response thống nhất giữa DB fields và API fields

### Kiến trúc triển khai
- `route -> controller -> service -> repository`
- Catalog là module đầu tiên dùng đúng pattern này.

## Phase 2: Auth
### Endpoint mục tiêu
- `POST /auth/login`
- `POST /auth/register`
- `POST /auth/logout`
- `GET /auth/me`
- `PUT /auth/profile`
- `POST /auth/change-password`

### Ghi chú
- Frontend hiện kỳ vọng model user giàu hơn schema `users` hiện tại.
- Phase implement sẽ cần chốt lại fields user, password handling và auth token flow.

## Phase 3: Orders, Promotions, Transactions
### Endpoint mục tiêu
- `POST /orders`
- `GET /orders/my-orders`
- `GET /orders/:id`
- `GET /orders/number/:orderNumber`
- `POST /orders/:id/cancel`
- `GET /promotions`
- `GET /promotions/active`
- `POST /promotions/validate`

### Ghi chú
- Sẽ cần mở rộng contract đơn hàng so với schema tối giản hiện tại.
- Cần chốt rõ order numbering, payment status, promotion validation và transaction linkage.

## Quy tắc chung cho phase API
- Ưu tiên khớp frontend services hiện có.
- Schema có thể giữ `snake_case`.
- API response cần thống nhất một format duy nhất cho toàn bộ module.
- Mỗi phase phải đi kèm cập nhật docs, lint, build và test phù hợp.
