# Overview

## Mục đích dự án
- Xây dựng website bán tài khoản game.
- Hệ thống phục vụ hai nhóm chính: người dùng mua hàng và quản trị viên vận hành hệ thống.

## Công nghệ chính
- `frontend/`: React + Vite + TypeScript.
- `backend/`: Node.js + Express + TypeScript.
- Database: PostgreSQL.
- Hạ tầng local/dev: Docker Compose.

## Tư duy tổ chức dự án
- Ưu tiên rõ ràng trách nhiệm từng phần.
- Tách giao diện, nghiệp vụ và truy cập dữ liệu.
- Tài liệu phải đủ để người quay lại dự án sau thời gian dài vẫn nắm được cấu trúc.

## Phạm vi lõi của hệ thống
- Hiển thị danh sách tài khoản game.
- Tìm kiếm, lọc, xem chi tiết.
- Đặt hàng và quản lý đơn hàng.
- Xác thực người dùng và phân quyền admin.
- Quản trị sản phẩm, người dùng, đơn hàng và dữ liệu liên quan.
