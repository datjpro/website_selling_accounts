# Structure

## Root
- `frontend/`: ứng dụng giao diện người dùng.
- `backend/`: API và xử lý nghiệp vụ.
- `docs/`: tài liệu lõi của dự án.
- `docker-compose.yml`: cấu hình chạy nhiều service cục bộ.
- `README.md`: hướng dẫn cài đặt, chạy dự án và thông tin nền.

## Backend structure đề xuất
- `src/routes/`: khai báo endpoint.
- `src/controllers/`: nhận request, trả response.
- `src/services/`: business logic.
- `src/repositories/` hoặc `src/models/`: truy cập dữ liệu.
- `src/middleware/`: auth, validate, error handling.
- `src/utils/`: helper dùng chung.
- `src/types/`: kiểu dữ liệu dùng chung nếu cần.

## Frontend structure đề xuất
- `src/pages/`: các màn hình chính theo route.
- `src/components/`: UI dùng lại.
- `src/services/` hoặc `src/api/`: toàn bộ HTTP client và API wrapper.
- `src/hooks/`: custom hooks.
- `src/context/`: state dùng toàn app.
- `src/types/`: type dùng chung.
- `src/assets/`: ảnh, icon, style tĩnh.

## Nguyên tắc mở rộng
- Nếu thêm module mới, phải xác định rõ nó thuộc layer nào.
- Không thêm logic database vào route.
- Không thêm logic gọi API trực tiếp rải rác trong nhiều component nếu có thể gom vào service.
- Nếu cấu trúc thực tế khác đề xuất ở trên, tài liệu này phải được cập nhật để phản ánh đúng hiện trạng.
