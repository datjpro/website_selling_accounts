# Backend Notes

## Vai trò
- Cung cấp REST API cho frontend.
- Kết nối MySQL local từ tiến trình backend local.
- Tự khởi tạo database `shopacc_mysql` và chạy schema nền tảng khi khởi động.

## Startup flow hiện tại
1. Chạy `npm start` hoặc `npm run dev` trong `backend/`.
2. Load biến môi trường từ `backend/.env`.
3. Chạy `ensureDatabaseSchema()`.
4. Tạo database nếu chưa tồn tại.
5. Chạy `backend/src/database/mysql_init.sql`.
6. Chạy migration nhẹ để bổ sung các field Catalog còn thiếu nếu DB cũ đã tồn tại.
7. Kết nối MySQL.
8. Expose `GET /api/health` và các route API hiện có.

## Pattern hiện tại
- `accounts`: vẫn còn `route -> controller -> model` từ phần cũ.
- `catalog`: đã bắt đầu dùng `route -> controller -> service -> repository`.

## Pattern đích
- Toàn bộ backend sẽ được chuyển dần sang `route -> controller -> service -> repository`.

## Source of truth
- Schema: `backend/DATABASE_SCHEMA.md`
- Setup DB: `backend/DATABASE_SETUP.md`
- Roadmap API: `docs/api-roadmap.md`
