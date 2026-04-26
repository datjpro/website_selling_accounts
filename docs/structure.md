# Structure

## Root
- `frontend/`: ứng dụng giao diện người dùng.
- `backend/`: API và xử lý nghiệp vụ.
- `docs/`: tài liệu lõi của dự án.
- `docker-compose.yml`: cấu hình chạy frontend/backend bằng Docker.
- `README.md`: hướng dẫn cài đặt và chạy dự án.

## Backend current state
Backend hiện có các nhóm thư mục sau:
- `src/routes/`: khai báo endpoint.
- `src/controllers/`: nhận request và trả response.
- `src/models/`: truy cập dữ liệu hiện tại.
- `src/config/`: cấu hình database và runtime.
- `src/database/`: script schema và logic tự khởi tạo DB.
- `src/types/`: kiểu dữ liệu dùng chung.

## Khoảng trống hiện tại
- Chưa có `services/` đầy đủ cho toàn bộ domain.
- Chưa có `repositories/` tách riêng khỏi `models/`.
- Chưa có module hóa đầy đủ theo từng bounded context như catalog, auth, orders.

## Hướng cấu trúc giai đoạn API kế tiếp
- Đích đến là `route -> controller -> service -> repository`.
- Catalog là module đầu tiên được chuyển sang pattern đầy đủ.
- Các module tiếp theo sẽ dùng cùng convention response, error và validation.

## Frontend current state
- `src/pages/`: màn hình chính.
- `src/components/`: UI dùng lại.
- `src/services/`: các API client wrapper đang định nghĩa contract backend mục tiêu.
- `src/contexts/`: state chia sẻ toàn app.
- `src/types.ts`: kiểu dữ liệu UI tổng quát.
