# Backend Notes

## Vai trò
- Cung cấp API cho frontend.
- Xử lý auth, business logic, truy cập database.

## Pattern khuyến nghị
- `routes` chỉ map endpoint.
- `controllers` xử lý request/response.
- `services` xử lý nghiệp vụ.
- `repositories/models` thao tác dữ liệu.
- `middleware` xử lý concern dùng chung.

## Nguyên tắc quan trọng
- Không để query database rải rác nhiều nơi nếu có thể gom lại.
- Không để logic phân quyền nằm lẫn trong từng controller nếu đã có middleware.
- Các thay đổi schema hoặc endpoint phải được phản ánh vào docs liên quan.
