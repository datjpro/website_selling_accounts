# Frontend Notes

## Cấu trúc Trang và Luồng chính
- `pages`: Các màn hình chính (Products, Detail, Checkout, Dashboard, Admin).
- `services`: Tập trung logic gọi API (authService, productService, orderService, adminService).
- `contexts`: Quản lý trạng thái toàn cục (Auth, Cart, Toast).

## Nguyên tắc triển khai
- Các màn hình User (Dashboard, Detail) và Admin (Products, Orders, Users) đều sử dụng dữ liệu thật từ API backend, không sử dụng mock data.
- Luồng mua hàng kết thúc bằng việc hiển thị thông tin tài khoản game trong trang `OrderDetailPage` sau khi đơn hàng được đánh dấu `completed`.
- Phân quyền được kiểm soát chặt chẽ qua `ProtectedRoute` cho cả User Dashboard và các trang Quản trị.
