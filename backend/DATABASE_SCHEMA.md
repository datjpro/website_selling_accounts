# DATABASE SCHEMA (MySQL)

D? án ShopAcc s? d?ng MySQL 8 làm co s? d? li?u chính.

## 1. USERS
Qu?n lý ngu?i dùng và phân quy?n.
- `id`: VARCHAR(36) PK DEFAULT (UUID())
- `email`: VARCHAR(255) UNIQUE
- `password_hash`: VARCHAR(255)
- `role`: VARCHAR(20) (admin, customer)
- `created_at`: TIMESTAMP

## 2. CATEGORIES
Danh m?c game.
- `id`: INT PK AUTO_INCREMENT
- `name`: VARCHAR(100)
- `slug`: VARCHAR(100) UNIQUE

## 3. PRODUCTS
Tài kho?n game dang bán.
- `id`: VARCHAR(36) PK DEFAULT (UUID())
- `category_id`: INT FK -> categories(id)
- `title`: VARCHAR(255)
- `description`: TEXT
- `price`: DECIMAL(12, 2)
- `stock_quantity`: INT
- `is_active`: BOOLEAN

## 4. PRODUCT_IMAGES
Hình ?nh gallery cho s?n ph?m.
- `id`: INT PK AUTO_INCREMENT
- `product_id`: VARCHAR(36) FK -> products(id)
- `image_url`: TEXT

## 5. PROMOTIONS
Mã gi?m giá.
- `id`: INT PK AUTO_INCREMENT
- `code`: VARCHAR(50) UNIQUE
- `discount_percent`: INT
- `valid_until`: TIMESTAMP

## 6. ORDERS
Ðon hàng mua tài kho?n.
- `id`: VARCHAR(36) PK DEFAULT (UUID())
- `user_id`: VARCHAR(36) FK -> users(id)
- `total_amount`: DECIMAL(12, 2)
- `status`: VARCHAR(50) (pending, completed, cancelled)
- `promotion_id`: INT FK -> promotions(id)

## 7. ORDER_ITEMS
Chi ti?t tài kho?n trong don hàng.
- `id`: VARCHAR(36) PK DEFAULT (UUID())
- `order_id`: VARCHAR(36) FK -> orders(id)
- `product_id`: VARCHAR(36) FK -> products(id)
- `price_at_purchase`: DECIMAL(12, 2)
- `quantity`: INT

## 8. TRANSACTIONS
L?ch s? giao d?ch thanh toán.
- `id`: VARCHAR(36) PK DEFAULT (UUID())
- `order_id`: VARCHAR(36) FK -> orders(id)
- `payment_method`: VARCHAR(50)
- `status`: VARCHAR(50)
- `amount`: DECIMAL(12, 2)

## 9. REVIEWS
Ðánh giá t? ngu?i dùng.
- `id`: INT PK AUTO_INCREMENT
- `product_id`: VARCHAR(36) FK -> products(id)
- `user_id`: VARCHAR(36) FK -> users(id)
- `rating`: INT (1-5)
- `comment`: TEXT
