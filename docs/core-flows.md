# Core Flows

## 1. Luồng duyệt và mua tài khoản
- Người dùng vào trang danh sách tài khoản.
- Hệ thống tách danh sách theo từng loại game hoặc category như LOL, Tốc Chiến để không trộn nhiều game trong cùng một khối hiển thị.
- Người dùng lọc hoặc tìm kiếm theo nhu cầu.
- Người dùng xem chi tiết tài khoản và các đánh giá từ khách hàng khác.
- Người dùng thêm vào giỏ hoặc mua trực tiếp. Sau khi thanh toán, người dùng được điều hướng đến trang chi tiết đơn hàng để nhận thông tin tài khoản game.

## 2. Luồng quản trị sản phẩm
- Admin đăng nhập vào khu vực quản trị.
- Admin quản lý sản phẩm (thêm, sửa, xóa), đơn hàng và người dùng thông qua các giao diện Dashboard kết nối trực tiếp với API hệ thống.
- Dữ liệu thay đổi được phản ánh tức thì ngoài frontend.

## 3. Luồng xác thực và phân quyền
- Người dùng đăng nhập để lấy token (JWT chỉ chứa ID người dùng).
- Hệ thống duy trì trạng thái đăng nhập qua AuthContext và bảo vệ các route nhạy cảm (Checkout, Dashboard, Admin).

## 4. Luồng đơn hàng và Đánh giá
- Khi người dùng đặt hàng, hệ thống tạo đơn và quản lý trạng thái (pending, paid, completed, cancelled).
- User có thể xem lại lịch sử đơn hàng và thông tin tài khoản đã bàn giao trong trang chi tiết đơn hàng.
- User có thể gửi đánh giá và đánh dấu các đánh giá hữu ích tại trang chi tiết sản phẩm.
