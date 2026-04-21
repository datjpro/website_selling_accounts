# AGENT.MD — ShopAcc Project Guide

## Mục đích của file này

File này dành cho **AI agent và developer mới** đọc trước khi chạm vào bất kỳ dòng code nào.
Mục tiêu là đảm bảo mọi người hiểu đúng kiến trúc, không làm hỏng pattern đang chạy tốt,
biết khi nào cần cập nhật tài liệu, và tuân thủ quy trình test + commit sau mỗi tính năng.

---

## Tổng quan dự án

**ShopAcc** là nền tảng bán tài khoản game trực tuyến.

| Thành phần | Stack                                       | Chạy tại         |
| ---------- | ------------------------------------------- | ---------------- |
| Frontend   | React 19 + Vite 7 + TypeScript + Tailwind   | `localhost:5173` |
| Backend    | Node.js 22 + Express 5 + TypeScript         | `localhost:3000` |
| Database   | PostgreSQL 16                               | `localhost:5433` |
| Infra      | Docker + Docker Compose                     | —                |

Cấu trúc thư mục gốc:

```
root/
├── frontend/          # UI layer
├── backend/           # API + business logic + DB access
├── docs/              # Tài liệu kiến trúc, flow, convention
├── docker-compose.yml
└── .env
```

---

## Kiến trúc tổng thể

- `frontend/` và `backend/` hoàn toàn tách biệt. Không để logic của layer này lẫn vào layer kia.
- Giao tiếp duy nhất giữa hai layer là qua HTTP REST API (`VITE_API_URL`).
- `docs/` là nguồn sự thật duy nhất về kiến trúc và convention. Đọc trước khi sửa.

---

## Pattern bắt buộc

### Backend

Flow chuẩn: `route → controller → service → repository`

- **route**: chỉ khai báo endpoint và gắn middleware, không chứa logic.
- **controller**: nhận request, validate input cơ bản, gọi service, trả response. Không chứa business logic.
- **service**: toàn bộ business logic nằm ở đây.
- **repository**: truy cập database. Không có SQL thô nằm rải rác ngoài tầng này.
- **middleware**: dùng cho auth, phân quyền, validate schema chung, xử lý lỗi tập trung.

Ví dụ đúng:
```
POST /api/orders
  → middleware: verifyToken
  → controller: OrderController.create
  → service: OrderService.createOrder
  → repository: OrderRepository.insert
```

### Frontend

Flow chuẩn: `page → component → api/service`

- **pages**: đại diện cho màn hình, điều phối component và gọi service.
- **components**: khối UI tái sử dụng, không tự gọi API trực tiếp (nhận data qua props hoặc custom hook).
- **services / api**: tập trung toàn bộ HTTP call (axios). Không gọi `axios` trực tiếp trong component.
- **hooks**: logic tái sử dụng phía client (data fetching, form state...). Không nhồi JSX vào hook.

---

## Cơ sở dữ liệu

9 bảng chính:

| Bảng             | Vai trò                              |
| ---------------- | ------------------------------------ |
| `users`          | Tài khoản người dùng và admin        |
| `categories`     | Danh mục game                        |
| `products`       | Tài khoản game đang bán              |
| `product_images` | Hình ảnh sản phẩm                    |
| `orders`         | Đơn hàng                             |
| `order_items`    | Chi tiết từng dòng trong đơn         |
| `promotions`     | Mã giảm giá / khuyến mãi             |
| `transactions`   | Giao dịch thanh toán                 |
| `reviews`        | Đánh giá sản phẩm                    |

Chi tiết schema: `backend/DATABASE_SCHEMA.md`

---

## Quy ước đặt tên

| Đối tượng              | Convention   | Ví dụ                          |
| ---------------------- | ------------ | ------------------------------ |
| File, folder           | `kebab-case` | `order-service.ts`             |
| React component (file) | `PascalCase` | `ProductCard.tsx`              |
| Biến, hàm              | `camelCase`  | `getUserOrders`                |
| Type, Interface, Class | `PascalCase` | `OrderItem`, `UserRepository`  |
| API endpoint           | `kebab-case` | `/api/order-items`             |
| DB column              | `snake_case` | `created_at`, `product_id`     |

> Tên field phải nhất quán giữa frontend và backend. Nếu backend trả `order_id`,
> frontend không tự ý đổi thành `orderId` trong DTO mà không có lý do.

---

## Tổ chức thư mục

- Chỉ thêm thư mục mới khi có lý do kiến trúc rõ ràng.
- Tên thư mục phải phản ánh đúng vai trò, không đặt tên mơ hồ như `utils2/`, `helpers_new/`.
- Mọi thay đổi ảnh hưởng đến kiến trúc, flow chính, schema hoặc convention đều phải cập nhật vào `docs/`.

---

## Tài liệu trong `docs/`

| File                   | Nội dung                                               |
| ---------------------- | ------------------------------------------------------ |
| `docs/overview.md`     | Tổng quan dự án, mục tiêu, actor chính                 |
| `docs/structure.md`    | Cấu trúc thư mục và vai trò từng phần                  |
| `docs/core-flows.md`   | Luồng nghiệp vụ cốt lõi (đặt hàng, thanh toán, auth…) |
| `docs/conventions.md`  | Quy ước code, naming, pattern                          |
| `docs/backend.md`      | Ghi chú riêng cho backend                              |
| `docs/frontend.md`     | Ghi chú riêng cho frontend                             |

---

## Quy trình bắt buộc sau mỗi tính năng mới

Sau khi hoàn thành một tính năng (feature), **bắt buộc thực hiện đủ 4 bước sau theo đúng thứ tự** trước khi chuyển sang task tiếp theo:

### Bước 1 — Tự kiểm tra (self-review)

- Đọc lại toàn bộ code vừa viết, đảm bảo đúng pattern (`route → controller → service → repository` hoặc `page → component → service`).
- Không còn `console.log` debug, không có secret hardcode.
- Xử lý đủ edge case: input rỗng, không tìm thấy record, lỗi DB.

### Bước 2 — Chạy lint và build

```bash
# Backend
cd backend && npm run lint && npm run build

# Frontend
cd frontend && npm run lint && npm run build
```

Không được có lỗi lint hoặc build. Nếu có warning liên quan đến code vừa viết, fix trước khi tiếp tục.

### Bước 3 — Chạy test

```bash
# Backend — unit test và integration test
cd backend && npm test

# Frontend — component test
cd frontend && npm test
```

- Tất cả test hiện có phải **xanh (pass)**.
- Nếu tính năng mới đủ phức tạp (service logic, API endpoint mới), **viết thêm test** cho phần đó trước khi commit.
- Không bỏ qua test thất bại bằng cách xóa hoặc skip test cũ.

### Bước 4 — Commit

Sau khi lint, build và test đều pass:

```bash
git add .
git commit -m "<type>(<scope>): <mô tả ngắn gọn bằng tiếng Anh>"
```

**Định dạng commit message** theo Conventional Commits:

| Type       | Dùng khi                                              |
| ---------- | ----------------------------------------------------- |
| `feat`     | Thêm tính năng mới                                    |
| `fix`      | Sửa bug                                               |
| `refactor` | Tái cấu trúc, không thêm tính năng và không fix bug   |
| `test`     | Thêm hoặc sửa test                                    |
| `docs`     | Cập nhật tài liệu                                     |
| `chore`    | Cấu hình, tooling, không ảnh hưởng logic              |

Ví dụ commit hợp lệ:

```
feat(orders): add order creation endpoint with promotion validation
fix(auth): handle expired JWT token returning 401 instead of 500
refactor(product-service): extract discount calculation to helper
test(orders): add unit tests for OrderService.createOrder
docs(agent): update core-flows after adding order cancellation
```

> Một commit nên phản ánh đúng một đơn vị thay đổi. Không nhét nhiều tính năng không liên quan vào một commit.

---

## Quy tắc khi làm việc trên dự án

1. **Đọc trước khi sửa**: `README.md` → toàn bộ `docs/` → file liên quan trực tiếp đến task.
2. **Xác định đúng layer**: sửa frontend, backend, hay cả hai? Sửa đúng tầng, không sửa sai tầng.
3. **Không refactor lan rộng** khi task chỉ yêu cầu thay đổi cục bộ.
4. **Sửa đúng gốc**, không vá tạm bằng workaround trừ khi ghi chú rõ lý do và plan fix sau.
5. **Cập nhật tài liệu** nếu thêm tính năng mới làm thay đổi flow, schema, hoặc convention.
6. **Không commit khi lint/build/test còn lỗi.** Không có ngoại lệ.

---

## Checklist cho agent / developer mới

**Trước khi bắt đầu task:**
- [ ] Đọc `README.md`
- [ ] Đọc toàn bộ file trong `docs/`
- [ ] Đọc `backend/DATABASE_SCHEMA.md` nếu task liên quan đến DB
- [ ] Xác định layer cần sửa: `frontend`, `backend`, hay cả hai
- [ ] Xác định đúng tầng trong layer đó (route, service, component, hook...)

**Sau khi hoàn thành tính năng:**
- [ ] Self-review: đúng pattern, không còn debug log, không hardcode secret
- [ ] `npm run lint` — không có lỗi mới
- [ ] `npm run build` — build thành công
- [ ] `npm test` — tất cả test pass
- [ ] Viết test mới nếu tính năng đủ phức tạp
- [ ] Cập nhật `docs/` nếu thay đổi ảnh hưởng kiến trúc hoặc flow chính
- [ ] Commit đúng format Conventional Commits

---

## Môi trường và biến môi trường quan trọng

Backend (`.env`):

```
PORT=3000
NODE_ENV=production
DB_HOST=postgres
DB_PORT=5432
DB_NAME=website_selling_accounts
DB_USER=postgres
DB_PASSWORD=shopacc_secure_password_2024
JWT_SECRET=<đổi ngay khi deploy production>
FRONTEND_URL=http://localhost:5173
```

Frontend (`.env`):

```
VITE_API_URL=http://localhost:3000/api
```

> ⚠️ Không commit `.env` thật lên git. Chỉ commit `.env.example`.

---

## Lưu ý bảo mật — bắt buộc trước khi production

- [ ] Đổi `JWT_SECRET` thành giá trị ngẫu nhiên mạnh (≥ 64 ký tự)
- [ ] Đổi `DB_PASSWORD` thành mật khẩu phức tạp
- [ ] Đổi mật khẩu tài khoản admin mặc định (`admin@shopacc.com / Admin@2024SecurePass`)
- [ ] Bật HTTPS với SSL certificate
- [ ] Cấu hình firewall và rate limiting
- [ ] Backup database định kỳ
- [ ] Monitor logs thường xuyên

---

## Lệnh hữu ích

```bash
# Khởi động toàn bộ hệ thống
docker-compose up -d

# Xem log realtime
docker-compose logs -f

# Kiểm tra health API
curl http://localhost:3000/api/health

# Reset hoàn toàn (xóa cả data)
docker-compose down -v && docker-compose build --no-cache && docker-compose up -d

# Backend dev
cd backend && npm run dev

# Frontend dev
cd frontend && npm run dev
```