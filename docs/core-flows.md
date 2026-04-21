# Core Flows

## 1. Luồng duyệt và mua tài khoản
- Người dùng vào trang danh sách tài khoản.
- Người dùng lọc hoặc tìm kiếm theo nhu cầu.
- Người dùng xem chi tiết tài khoản.
- Người dùng thêm vào giỏ hoặc mua trực tiếp.
- Hệ thống tạo đơn hàng và ghi nhận trạng thái thanh toán.

## 2. Luồng quản trị sản phẩm
- Admin đăng nhập vào khu vực quản trị.
- Admin tạo mới, cập nhật hoặc ẩn tài khoản/game account.
- Dữ liệu thay đổi phải phản ánh đúng ở danh sách ngoài frontend.

## 3. Luồng xác thực và phân quyền
- Người dùng đăng nhập để lấy token hoặc session.
- Backend xác minh danh tính.
- Middleware kiểm tra quyền ở các route nhạy cảm.
- Admin route phải được bảo vệ riêng.

## 4. Luồng đơn hàng
- Khi người dùng đặt hàng, hệ thống tạo bản ghi order.
- Trạng thái đơn hàng phải rõ ràng và theo một tập giá trị cố định.
- Sau thanh toán thành công, hệ thống mới bàn giao dữ liệu tài khoản hoặc đánh dấu hoàn tất theo rule thực tế.

## 5. Luồng cập nhật tài liệu
- Khi thay đổi schema, endpoint, flow nghiệp vụ hoặc convention, phải cập nhật file tương ứng trong `docs/`.
