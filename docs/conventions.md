# Conventions

## Code conventions
- Viết code nhất quán với style hiện có trong từng thư mục.
- Chỉ tạo abstraction mới khi thực sự giúp code rõ hơn.
- Không đổi tên hàng loạt nếu không cần thiết.

## Naming conventions
- Folder/file ưu tiên `kebab-case`.
- React component, type, interface ưu tiên `PascalCase`.
- Variable/function ưu tiên `camelCase`.
- Hằng số dùng `UPPER_SNAKE_CASE` nếu khu vực đó đang theo kiểu này.

## API conventions
- Response nên thống nhất một format xuyên suốt.
- Error message nên rõ nghĩa, không mơ hồ.
- Validation nằm gần entry point và/hoặc middleware, không để dữ liệu xấu đi quá sâu.

## Git và thay đổi mã nguồn
- Mỗi thay đổi nên nhỏ, rõ mục đích.
- Sửa đúng phạm vi user yêu cầu.
- Nếu thay đổi ảnh hưởng kiến trúc, cập nhật `docs/` cùng lúc.
