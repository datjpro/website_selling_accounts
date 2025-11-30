# Database Setup Guide

## Khởi động Database với Docker

### 1. Start all services

```bash
docker-compose up -d
```

Database sẽ tự động được khởi tạo với schema và sample data.

### 2. Kiểm tra logs

```bash
# Xem logs của PostgreSQL
docker-compose logs postgres

# Xem logs của backend
docker-compose logs backend
```

### 3. Kết nối vào database

```bash
# Sử dụng Docker exec
docker-compose exec postgres psql -U postgres -d website_selling_accounts

# Hoặc sử dụng local psql (port 5433)
psql -h localhost -p 5433 -U postgres -d website_selling_accounts
```

---

## Database Schema Overview

### 9 Tables chính:

1. **users** - Quản lý người dùng (user, vip, admin)
2. **categories** - Danh mục game
3. **products** - Sản phẩm (tài khoản game)
4. **product_images** - Ảnh sản phẩm
5. **orders** - Đơn hàng
6. **order_items** - Chi tiết đơn hàng
7. **promotions** - Mã giảm giá
8. **transactions** - Lịch sử giao dịch
9. **reviews** - Đánh giá sản phẩm

Chi tiết xem file: **DATABASE_SCHEMA.md**

---

## Sample Data đã có sẵn

### Categories (6 games):

- Liên Quân Mobile
- Free Fire
- PUBG Mobile
- Liên Minh: Tốc Chiến
- Valorant
- Genshin Impact

### Products (6 accounts):

- Liên Quân VIP 15 - 2,500,000đ
- Free Fire Full - 1,800,000đ
- PUBG Conqueror - 3,200,000đ
- LMTC Kim Cương - 2,100,000đ
- Valorant Immortal - 4,500,000đ
- Genshin AR 58 - 5,200,000đ

### Promotions (4 codes):

- **WELCOME2024** - Giảm 15% cho khách mới
- **FLASH50** - Giảm 50K
- **VIP100** - Giảm 100K cho đơn từ 1 triệu
- **MEGA20** - Giảm 20% cho đơn từ 2 triệu

### Admin Account:

- Username: `admin`
- Email: `admin@shopacc.com`
- Password: `admin123` (cần đổi sau khi login lần đầu)

---

## Useful SQL Commands

### Xem tất cả tables

```sql
\dt
```

### Xem structure của table

```sql
\d users
\d products
\d orders
```

### Query examples

#### Lấy tất cả products với category

```sql
SELECT p.*, c.name as category_name
FROM products p
LEFT JOIN categories c ON p.category_id = c.id;
```

#### Lấy orders với customer info

```sql
SELECT o.*, u.username, u.email
FROM orders o
LEFT JOIN users u ON o.user_id = u.id
ORDER BY o.created_at DESC;
```

#### Thống kê doanh thu theo game

```sql
SELECT
    c.name as game,
    COUNT(oi.id) as total_sales,
    SUM(oi.subtotal) as total_revenue
FROM order_items oi
JOIN products p ON oi.product_id = p.id
JOIN categories c ON p.category_id = c.id
JOIN orders o ON oi.order_id = o.id
WHERE o.status = 'completed'
GROUP BY c.name
ORDER BY total_revenue DESC;
```

#### Top selling products

```sql
SELECT
    p.name,
    p.sold_count,
    p.price,
    p.rating_average
FROM products p
ORDER BY p.sold_count DESC
LIMIT 10;
```

---

## Database Backup & Restore

### Backup

```bash
# Backup toàn bộ database
docker-compose exec postgres pg_dump -U postgres website_selling_accounts > backup.sql

# Backup chỉ schema (không data)
docker-compose exec postgres pg_dump -U postgres --schema-only website_selling_accounts > schema.sql

# Backup chỉ data
docker-compose exec postgres pg_dump -U postgres --data-only website_selling_accounts > data.sql
```

### Restore

```bash
# Restore từ backup file
docker-compose exec -T postgres psql -U postgres website_selling_accounts < backup.sql
```

---

## Reset Database

### Xóa toàn bộ và khởi tạo lại

```bash
# Stop services
docker-compose down

# Xóa volume (CẢNH BÁO: Mất toàn bộ data!)
docker volume rm website_selling_accounts_postgres_data

# Start lại (sẽ tự động chạy init.sql)
docker-compose up -d
```

### Chỉ reset tables (giữ database)

```sql
-- Kết nối vào database
docker-compose exec postgres psql -U postgres -d website_selling_accounts

-- Drop tất cả tables
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS transactions CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS product_images CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;
DROP TABLE IF EXISTS promotions CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Sau đó chạy lại init.sql
\i /docker-entrypoint-initdb.d/init.sql
```

---

## Troubleshooting

### Database không khởi động

```bash
# Kiểm tra logs
docker-compose logs postgres

# Kiểm tra health check
docker-compose ps
```

### Port conflict (5433 đã được dùng)

Sửa trong `docker-compose.yml`:

```yaml
postgres:
  ports:
    - "5434:5432" # Đổi port khác
```

### Connection refused từ backend

- Đảm bảo `DB_HOST=postgres` (không phải localhost)
- Kiểm tra backend có depends_on postgres không
- Đợi postgres health check passed

### Init.sql không chạy

- Volume postgres_data đã tồn tại từ trước
- Xóa volume và start lại:
  ```bash
  docker-compose down -v
  docker-compose up -d
  ```

---

## Production Considerations

### 1. Security

- [ ] Đổi password admin mặc định
- [ ] Sử dụng strong passwords cho DB
- [ ] Enable SSL cho PostgreSQL
- [ ] Restrict network access
- [ ] Regular security updates

### 2. Performance

- [ ] Add appropriate indexes
- [ ] Enable query logging
- [ ] Monitor slow queries
- [ ] Setup connection pooling
- [ ] Configure autovacuum

### 3. Backup Strategy

- [ ] Daily automated backups
- [ ] Test restore procedures
- [ ] Offsite backup storage
- [ ] Point-in-time recovery setup
- [ ] Backup retention policy

### 4. Monitoring

- [ ] Setup pg_stat_statements
- [ ] Monitor disk usage
- [ ] Track connection count
- [ ] Alert on errors
- [ ] Performance metrics

---

## Next Steps

1. ✅ Database schema designed
2. ✅ Sample data populated
3. ⏳ Create TypeScript models
4. ⏳ Build API endpoints
5. ⏳ Implement authentication
6. ⏳ Payment gateway integration
7. ⏳ Admin dashboard API
8. ⏳ Frontend-backend integration

---

## Support

Nếu gặp vấn đề với database:

1. Check logs: `docker-compose logs postgres`
2. Verify connection: `docker-compose exec postgres psql -U postgres`
3. Review schema: See `DATABASE_SCHEMA.md`
4. Reset if needed: Follow reset guide above
