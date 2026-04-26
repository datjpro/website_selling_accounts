# Conventions

## Code
- Giữ thay đổi nhỏ, đúng phạm vi user yêu cầu.
- Sửa đúng gốc vấn đề, tránh workaround nếu không cần.
- Khi thay đổi kiến trúc, API hoặc schema thì cập nhật `docs/` cùng lúc.

## Naming
- File và folder: `kebab-case`
- Function và variable: `camelCase`
- Type, interface, class: `PascalCase`
- DB column: `snake_case`

## API
- Chọn một format response thống nhất cho từng phase API.
- Giai đoạn API sắp tới cần khóa rõ mapping giữa DB và API response.
- Validation đặt gần entry point hoặc middleware.
- Error message rõ nghĩa, tránh mơ hồ.

## Backend architecture
- Hiện tại có thể còn `route -> controller -> model` ở một số phần cũ.
- Đích đến là `route -> controller -> service -> repository`.
- Module Catalog sẽ là nơi áp dụng pattern đích đầu tiên.

## Database
- Runtime hiện tại dùng MySQL local trên `localhost:3306`.
- Backend Docker kết nối qua `host.docker.internal`.
- Database hiện tại là `shopacc_mysql`.
