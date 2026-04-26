# ShopAcc

ShopAcc là nền tảng bán tài khoản game trực tuyến.

## Trạng thái hiện tại
- Frontend chạy bằng Vite ở `http://localhost:5173`
- Backend chạy trong Docker ở `http://localhost:3000`
- MySQL chạy sẵn trên máy host ở `localhost:3306`
- Backend container kết nối MySQL qua `host.docker.internal`
- Database hiện dùng là `shopacc_mysql`
- Backend tự tạo database và tự chạy `backend/src/database/mysql_init.sql` khi khởi động để đảm bảo đủ 9 bảng nền tảng

## Cấu trúc dự án
- `frontend/`: ứng dụng React + Vite
- `backend/`: API Express + TypeScript + MySQL
- `docs/`: tài liệu kiến trúc, flow, convention, roadmap
- `docker-compose.yml`: chạy frontend/backend bằng Docker

## Khởi động nhanh
### Yêu cầu
- Docker Desktop
- MySQL local đang chạy ở `localhost:3306`
- Tài khoản MySQL dev: `root / 123456`

### Chạy dự án
```bash
docker compose up -d
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

## Database
Nguồn sự thật cho schema và setup:
- `backend/DATABASE_SCHEMA.md`
- `backend/DATABASE_SETUP.md`

## Ghi chú
- Không cần chạy backend thủ công ngoài máy khi đã dùng Docker.
- Backend Docker sẽ tự đảm bảo DB `shopacc_mysql` tồn tại và đủ 9 bảng nền tảng.
- Các module API nghiệp vụ đầy đủ sẽ được phát triển tiếp theo roadmap trong `docs/api-roadmap.md`.
