# Backend Notes

## Vai trò
- Cung cấp REST API cho frontend.
- Kết nối MySQL local từ backend container.
- Tự khởi tạo database `shopacc_mysql` và chạy schema nền tảng khi khởi động.

## Startup flow hiện tại
1. Container backend khởi động.
2. Load biến môi trường.
3. Chạy `ensureDatabaseSchema()`.
4. Tạo database nếu chưa tồn tại.
5. Chạy `backend/src/database/mysql_init.sql` để đảm bảo đủ 9 bảng.
6. Kết nối MySQL.
7. Expose `GET /api/health` và các route API hiện có.

## Pattern hiện tại
- `routes`: map endpoint.
- `controllers`: xử lý request/response.
- `models`: truy cập dữ liệu.

## Pattern đích
- `route -> controller -> service -> repository`
- Catalog sẽ là module đầu tiên được triển khai đúng pattern đích.

## Source of truth
- Schema: `backend/DATABASE_SCHEMA.md`
- Setup DB: `backend/DATABASE_SETUP.md`
- Roadmap API: `docs/api-roadmap.md`
