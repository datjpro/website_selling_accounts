# DATABASE SETUP (MySQL + Docker)

## Thông tin k?t n?i m?c d?nh
- Host: `localhost`
- Port: `3306`
- Database: `shopacc_mysql`
- User: `root`
- Password: `123456`

## Kh?i d?ng nhanh
```bash
MySQL da chay san tren may; chi can tao DB moi `shopacc_mysql`
```

## Xem logs MySQL
```bash
docker-compose logs mysql
```

## Truy c?p MySQL trong container
```bash
Ket noi MySQL local tren port 3306 bang root/123456
```

## Ch?y l?i script kh?i t?o schema
Script ngu?n s? th?t n?m t?i:
- `backend/src/database/mysql_init.sql`

N?u c?n reset toàn b? d? li?u dev:
```bash
docker-compose down -v
MySQL da chay san tren may; chi can tao DB moi `shopacc_mysql`
```

## Ki?m tra các b?ng dã t?o
Trong MySQL shell:
```sql
SHOW TABLES;
```

Các b?ng mong d?i:
- users
- categories
- products
- product_images
- promotions
- orders
- order_items
- transactions
- reviews

## Ki?m tra k?t n?i t? backend
Backend dùng các bi?n môi tru?ng:
- `DB_HOST=localhost`
- `DB_PORT=3306`
- `DB_NAME=shopacc_mysql`
- `DB_USER=root`
- `DB_PASSWORD=123456`

## Ghi chú tri?n khai
- MySQL version: `8.0`
- Các khóa UUID dùng `VARCHAR(36)` v?i default `UUID()` ? phía DB.
- Ðây là h? t?ng database n?n t?ng; chua bao g?m seed d? li?u nghi?p v? d?y d?.
