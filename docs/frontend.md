# Frontend Notes

## Vai trò
- Hiển thị giao diện, điều hướng người dùng và kết nối tới backend.

## Pattern khuyến nghị
- `pages` làm entry cho từng màn hình.
- `components` dùng để tách UI thành các phần nhỏ tái sử dụng.
- `services/api` là nơi gọi backend.
- `hooks` gom logic client-side có thể tái sử dụng.

## Nguyên tắc quan trọng
- Không gọi API trực tiếp tràn lan trong nhiều component nếu có thể gom service.
- Không nhồi business logic nặng vào component hiển thị.
- Các state dùng chung nên được gom có chủ đích, tránh phát tán quá nhiều context không cần thiết.
