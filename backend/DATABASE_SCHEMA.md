# Database Schema Documentation

## Overview

Database schema cho website bán tài khoản game "ShopAcc"

## Entity Relationship Diagram (ERD)

```
┌─────────────────┐
│     USERS       │
├─────────────────┤
│ id (PK)         │
│ username        │
│ email           │
│ password_hash   │
│ full_name       │
│ phone           │
│ avatar_url      │
│ role            │
│ status          │
│ balance         │
│ total_spent     │
│ total_orders    │
└────────┬────────┘
         │
         │ 1:N
         │
┌────────▼────────┐       ┌─────────────────┐
│     ORDERS      │       │   TRANSACTIONS  │
├─────────────────┤       ├─────────────────┤
│ id (PK)         │───────│ id (PK)         │
│ order_number    │  1:N  │ user_id (FK)    │
│ user_id (FK)    │       │ order_id (FK)   │
│ total_amount    │       │ amount          │
│ payment_method  │       │ payment_method  │
│ status          │       │ status          │
└────────┬────────┘       └─────────────────┘
         │
         │ 1:N
         │
┌────────▼────────┐       ┌─────────────────┐
│  ORDER_ITEMS    │       │    PRODUCTS     │
├─────────────────┤       ├─────────────────┤
│ id (PK)         │       │ id (PK)         │
│ order_id (FK)   │───────│ category_id(FK) │
│ product_id (FK) │  N:1  │ name            │
│ product_name    │       │ game_title      │
│ product_price   │       │ price           │
│ quantity        │       │ stock_quantity  │
│ account_info    │       │ rating_average  │
└─────────────────┘       └────────┬────────┘
                                   │
                                   │ 1:N
         ┌─────────────────────────┼─────────────┐
         │                         │             │
┌────────▼────────┐       ┌────────▼────────┐  │
│   CATEGORIES    │       │ PRODUCT_IMAGES  │  │
├─────────────────┤       ├─────────────────┤  │
│ id (PK)         │       │ id (PK)         │  │
│ name            │       │ product_id (FK) │  │
│ slug            │       │ image_url       │  │
│ description     │       │ is_primary      │  │
└─────────────────┘       └─────────────────┘  │
                                               │
                                               │
                          ┌────────────────────▼──┐
                          │      REVIEWS          │
                          ├───────────────────────┤
                          │ id (PK)               │
                          │ product_id (FK)       │
                          │ user_id (FK)          │
                          │ rating                │
                          │ comment               │
                          └───────────────────────┘

┌─────────────────┐
│   PROMOTIONS    │
├─────────────────┤
│ id (PK)         │
│ code            │
│ discount_type   │
│ discount_value  │
│ usage_limit     │
└─────────────────┘
```

## Tables Description

### 1. USERS

Quản lý thông tin người dùng (khách hàng, admin, VIP)

**Fields:**

- `id`: Primary key
- `username`: Tên đăng nhập (unique)
- `email`: Email (unique)
- `password_hash`: Mật khẩu đã mã hóa
- `role`: user, vip, admin
- `status`: active, banned, suspended
- `balance`: Số dư tài khoản
- `total_spent`: Tổng chi tiêu
- `total_orders`: Tổng số đơn hàng

**Relationships:**

- 1:N with Orders
- 1:N with Transactions
- 1:N with Reviews

---

### 2. CATEGORIES

Danh mục game (Liên Quân, Free Fire, PUBG...)

**Fields:**

- `id`: Primary key
- `name`: Tên danh mục
- `slug`: URL-friendly name
- `description`: Mô tả
- `image_url`: Ảnh đại diện
- `is_active`: Trạng thái kích hoạt

**Relationships:**

- 1:N with Products

---

### 3. PRODUCTS

Sản phẩm (tài khoản game)

**Fields:**

- `id`: Primary key
- `category_id`: Foreign key to Categories
- `name`: Tên sản phẩm
- `slug`: URL-friendly name
- `game_title`: Tên game
- `description`: Mô tả chi tiết
- `price`: Giá bán
- `original_price`: Giá gốc
- `rank_level`: Rank/cấp độ tài khoản
- `stock_quantity`: Số lượng tồn kho
- `sold_count`: Số lượng đã bán
- `rating_average`: Đánh giá trung bình
- `is_featured`: Sản phẩm nổi bật
- `badge`: HOT, VIP, FLASH, MEGA

**Relationships:**

- N:1 with Categories
- 1:N with Product_Images
- 1:N with Order_Items
- 1:N with Reviews

---

### 4. PRODUCT_IMAGES

Ảnh sản phẩm (gallery)

**Fields:**

- `id`: Primary key
- `product_id`: Foreign key to Products
- `image_url`: URL ảnh
- `is_primary`: Ảnh chính hay không
- `sort_order`: Thứ tự hiển thị

**Relationships:**

- N:1 with Products

---

### 5. ORDERS

Đơn hàng

**Fields:**

- `id`: Primary key
- `order_number`: Mã đơn hàng (unique)
- `user_id`: Foreign key to Users
- `customer_name`: Tên khách hàng
- `customer_email`: Email khách hàng
- `total_amount`: Tổng tiền
- `final_amount`: Số tiền sau giảm giá
- `payment_method`: Phương thức thanh toán
- `payment_status`: pending, paid, failed, refunded
- `status`: pending, processing, completed, cancelled

**Relationships:**

- N:1 with Users
- 1:N with Order_Items
- 1:N with Transactions

---

### 6. ORDER_ITEMS

Chi tiết đơn hàng (sản phẩm trong đơn)

**Fields:**

- `id`: Primary key
- `order_id`: Foreign key to Orders
- `product_id`: Foreign key to Products
- `product_name`: Tên sản phẩm (snapshot)
- `product_price`: Giá (snapshot)
- `quantity`: Số lượng
- `account_username`: Tài khoản game
- `account_password`: Mật khẩu
- `account_email`: Email liên kết
- `additional_info`: Thông tin bổ sung

**Relationships:**

- N:1 with Orders
- N:1 with Products

---

### 7. PROMOTIONS

Mã giảm giá / Khuyến mãi

**Fields:**

- `id`: Primary key
- `code`: Mã khuyến mãi (unique)
- `title`: Tiêu đề
- `discount_type`: percentage, fixed, gift
- `discount_value`: Giá trị giảm
- `min_order_amount`: Giá trị đơn tối thiểu
- `usage_limit`: Số lần sử dụng tối đa
- `usage_count`: Số lần đã sử dụng
- `badge`: HOT, FLASH, VIP, MEGA
- `start_date`: Ngày bắt đầu
- `end_date`: Ngày kết thúc

---

### 8. TRANSACTIONS

Lịch sử giao dịch

**Fields:**

- `id`: Primary key
- `user_id`: Foreign key to Users
- `order_id`: Foreign key to Orders
- `transaction_type`: deposit, purchase, refund, withdrawal
- `amount`: Số tiền
- `payment_method`: Phương thức thanh toán
- `payment_gateway`: Cổng thanh toán (MoMo, ZaloPay...)
- `status`: pending, completed, failed, cancelled

**Relationships:**

- N:1 with Users
- N:1 with Orders

---

### 9. REVIEWS

Đánh giá sản phẩm

**Fields:**

- `id`: Primary key
- `product_id`: Foreign key to Products
- `user_id`: Foreign key to Users
- `order_id`: Foreign key to Orders
- `rating`: 1-5 sao
- `title`: Tiêu đề đánh giá
- `comment`: Nội dung
- `is_verified_purchase`: Đã mua hàng hay chưa
- `is_approved`: Đã duyệt hay chưa

**Relationships:**

- N:1 with Products
- N:1 with Users
- N:1 with Orders

---

## Indexes

### Performance Indexes

- Users: email, username, role, status
- Products: category_id, status, slug, price, rating
- Orders: user_id, order_number, status, payment_status
- Transactions: user_id, order_id, type, status
- Reviews: product_id, user_id, is_approved

---

## Triggers

### Auto-update timestamps

- `update_updated_at_column()`: Tự động cập nhật `updated_at` khi record được update

Áp dụng cho:

- users
- categories
- products
- orders
- promotions
- transactions
- reviews

---

## Sample Data

Database đã có sẵn:

- 6 categories (Liên Quân, Free Fire, PUBG, Liên Minh, Valorant, Genshin)
- 6 sample products
- 4 promotions (WELCOME2024, FLASH50, VIP100, MEGA20)
- 1 admin user (username: admin, email: admin@shopacc.com)

---

## Security Considerations

1. **Password Hashing**: Sử dụng bcrypt với cost factor 10
2. **SQL Injection Prevention**: Sử dụng parameterized queries
3. **Foreign Key Constraints**: Đảm bảo tính toàn vẹn dữ liệu
4. **Cascading Deletes**: Xóa đúng cách khi xóa parent records
5. **Check Constraints**: Validate dữ liệu ở database level

---

## Migration Guide

### Initial Setup

```bash
# Run init.sql to create all tables
psql -U postgres -d website_selling_accounts -f src/database/init.sql
```

### Backup

```bash
# Backup database
pg_dump -U postgres website_selling_accounts > backup.sql
```

### Restore

```bash
# Restore database
psql -U postgres website_selling_accounts < backup.sql
```

---

## Future Enhancements

1. **Wishlists**: Danh sách yêu thích
2. **Notifications**: Thông báo hệ thống
3. **Chat Messages**: Tin nhắn khách hàng - admin
4. **Audit Logs**: Lịch sử thay đổi dữ liệu
5. **Reports**: Bảng báo cáo thống kê
6. **Vouchers**: Phiếu quà tặng
7. **Referrals**: Giới thiệu bạn bè
