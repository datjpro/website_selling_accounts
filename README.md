# 🎮 ShopAcc - Website Bán Tài Khoản Game

Nền tảng bán tài khoản game trực tuyến được xây dựng với React, Vite, Node.js, Express và MySQL.

## 📁 Cấu trúc dự án

```
root/
├── frontend/          # Giao diện người dùng - React + Vite (TypeScript)
├── backend/           # API Backend - Node/Express + MySQL (TypeScript)
├── docker-compose.yml # Docker containerization
├── .env               # Biến môi trường
└── README.md          # File này
```

## 🎯 Tính năng chính

### Cho người dùng

✅ Xem danh sách tài khoản game theo danh mục  
✅ Tìm kiếm & lọc sản phẩm nâng cao  
✅ Giỏ hàng & thanh toán trực tuyến  
✅ Quản lý đơn hàng cá nhân  
✅ Đánh giá & nhận xét sản phẩm  
✅ Hệ thống khuyến mãi & mã giảm giá

### Cho admin

✅ Quản lý sản phẩm (CRUD)  
✅ Quản lý đơn hàng  
✅ Quản lý người dùng  
✅ Dashboard thống kê  
✅ Quản lý khuyến mãi

## 📋 Yêu cầu hệ thống

- **Docker Desktop** (Khuyến nghị - dễ nhất)
- Hoặc: Node.js 18+, MySQL 14+, npm/yarn

## 🚀 Khởi động nhanh (Docker - Khuyến nghị)

### Bước 1: Cài đặt Docker Desktop

- Download: https://www.docker.com/products/docker-desktop/
- Cài đặt và khởi động Docker Desktop
- Đợi icon Docker ở taskbar chuyển sang màu xanh

### Bước 2: Clone dự án

```bash
git clone https://github.com/datjpro/shopacc_mysql.git
cd shopacc_mysql
```

### Bước 3: Deploy tự động

**PowerShell (Windows):**

```powershell
.\deploy.ps1
```

**Command Prompt:**

```cmd
deploy.bat
```

**Linux/Mac:**

```bash
docker-compose build
docker-compose up -d
```

### Bước 4: Truy cập ứng dụng

- **Website**: http://localhost:5173
- **API Backend**: http://localhost:3000/api
- **Database**: localhost:3306

### Thông tin đăng nhập Admin mặc định

```
Email: admin@shopacc.com
Mật khẩu: Admin@2024SecurePass
```

⚠️ **QUAN TRỌNG: Đổi mật khẩu ngay sau lần đăng nhập đầu tiên!**

## 🛠️ Cài đặt thủ công (Không dùng Docker)

### Cài đặt Backend

1. Di chuyển vào thư mục backend:

   ```bash
   cd backend
   ```

2. Cài đặt dependencies:

   ```bash
   npm install
   ```

3. Tạo file môi trường:

   ```bash
   cp .env.example .env
   # Chỉnh sửa .env với thông tin database của bạn
   ```

4. Khởi tạo database:

   ```bash
   # Tạo database và chạy init.sql
   mysql -u root -p123456 shopacc_mysql < src/database/mysql_init.sql
   ```

5. Chạy server:
   ```bash
   npm run dev
   ```

### Cài đặt Frontend

1. Di chuyển vào thư mục frontend:

   ```bash
   cd frontend
   ```

2. Cài đặt dependencies:

   ```bash
   npm install
   ```

3. Tạo file môi trường:

   ```bash
   cp .env.example .env
   ```

4. Chạy development server:
   ```bash
   npm run dev
   ```

## 🌐 API Endpoints

| Phương thức | Endpoint          | Mô tả                 |
| ----------- | ----------------- | --------------------- |
| GET         | /api/health       | Kiểm tra trạng thái   |
| GET         | /api/accounts     | Lấy tất cả tài khoản  |
| GET         | /api/accounts/:id | Lấy tài khoản theo ID |
| POST        | /api/accounts     | Tạo tài khoản mới     |
| PUT         | /api/accounts/:id | Cập nhật tài khoản    |
| DELETE      | /api/accounts/:id | Xóa tài khoản         |

## ⚙️ Các lệnh hữu ích

### Backend

- `npm run dev` - Chạy server development với hot reload
- `npm run build` - Build TypeScript sang JavaScript
- `npm start` - Chạy production server
- `npm run lint` - Kiểm tra code với ESLint

### Frontend

- `npm run dev` - Chạy development server
- `npm run build` - Build cho production
- `npm run preview` - Xem trước bản build
- `npm run lint` - Kiểm tra code với ESLint

### Docker

- `docker-compose up -d` - Khởi động tất cả services
- `docker-compose down` - Dừng tất cả services
- `docker-compose logs -f` - Xem logs theo thời gian thực
- `docker-compose restart` - Khởi động lại services
- `docker-compose ps` - Kiểm tra trạng thái containers

## 🔧 Biến môi trường

### Backend (.env)

| Biến         | Mô tả                 | Mặc định                     |
| ------------ | --------------------- | ---------------------------- |
| PORT         | Cổng server           | 3000                         |
| NODE_ENV     | Môi trường chạy       | production                   |
| DB_HOST      | MySQL host       | mysql                        |
| DB_PORT      | MySQL port       | 3306                         |
| DB_NAME      | Tên database          | shopacc_mysql     |
| DB_USER      | User database         | root                         |
| DB_PASSWORD  | Mật khẩu database     | shopacc_secure_password_2024 |
| JWT_SECRET   | Secret key cho JWT    | (thay đổi trong production)  |
| FRONTEND_URL | URL frontend cho CORS | http://localhost:5173        |

### Frontend (.env)

| Biến         | Mô tả           | Mặc định                  |
| ------------ | --------------- | ------------------------- |
| VITE_API_URL | URL API Backend | http://localhost:3000/api |

## 💻 Stack công nghệ

### Frontend

- **React 19** - UI Framework
- **Vite 7** - Build tool nhanh
- **TypeScript 5.9** - Type safety
- **Tailwind CSS 3.4** - Styling
- **React Router 7** - Navigation
- **Lucide React** - Icons
- **Axios** - HTTP client

### Backend

- **Node.js 22** - Runtime
- **Express 5** - Web framework
- **TypeScript 5.9** - Type safety
- **MySQL 16** - Database
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing

### DevOps

- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration

## 📂 Cơ sở dữ liệu

### 9 bảng chính:

1. **users** - Người dùng (khách hàng, admin)
2. **categories** - Danh mục game
3. **products** - Sản phẩm (tài khoản game)
4. **product_images** - Hình ảnh sản phẩm
5. **orders** - Đơn hàng
6. **order_items** - Chi tiết đơn hàng
7. **promotions** - Mã khuyến mãi
8. **transactions** - Giao dịch thanh toán
9. **reviews** - Đánh giá sản phẩm

Xem chi tiết: `backend/DATABASE_SCHEMA.md`

## 🐛 Xử lý lỗi thường gặp

### Docker không chạy được

```powershell
# Kiểm tra Docker Desktop đã mở chưa
docker ps

# Nếu lỗi → Mở Docker Desktop và đợi 30-60 giây
```

### Port đã được sử dụng

```powershell
# Tìm process đang dùng port 5173
netstat -ano | findstr :5173

# Kill process (thay <PID> bằng số process ID)
taskkill /PID <PID> /F
```

### Container khởi động lại liên tục

```powershell
# Xem logs để tìm lỗi
docker-compose logs backend

# Restart lại
docker-compose restart
```

### Reset hoàn toàn

```powershell
# Dừng và xóa tất cả (bao gồm database)
docker-compose down -v

# Build và chạy lại
docker-compose build --no-cache
docker-compose up -d
```

## 📚 Tài liệu bổ sung

- **QUICKSTART.md** - Hướng dẫn bắt đầu nhanh 3 bước
- **DEPLOY_GUIDE.md** - Hướng dẫn deploy chi tiết
- **README_DEPLOYMENT.md** - Deploy lên production (AWS, VPS)
- **DOCKER_NOT_RUNNING.md** - Xử lý khi Docker không chạy
- **SYSTEM_ASSESSMENT.md** - Đánh giá hệ thống & roadmap
- **frontend/FEATURES.md** - Tài liệu tính năng frontend
- **backend/DATABASE_SCHEMA.md** - Sơ đồ cơ sở dữ liệu
- **backend/DATABASE_SETUP.md** - Hướng dẫn setup database

## 🔐 Bảo mật

### Khuyến nghị cho Production:

- [ ] Thay đổi `JWT_SECRET` thành giá trị ngẫu nhiên mạnh
- [ ] Thay đổi `DB_PASSWORD` thành mật khẩu phức tạp
- [ ] Thay đổi mật khẩu admin mặc định
- [ ] Bật HTTPS với SSL certificate
- [ ] Cấu hình firewall
- [ ] Setup rate limiting
- [ ] Backup database định kỳ
- [ ] Monitor logs thường xuyên

## 📊 Giám sát

### Kiểm tra health

```bash
# Backend API
curl http://localhost:3000/api/health

# Database
docker-compose exec mysql mysqladmin ping -u root -p123456
```

### Xem resource usage

```bash
# Container stats
docker stats

# Disk usage
docker system df
```

## 🔄 Cập nhật

### Pull code mới nhất

```bash
git pull origin dev
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Vui lòng:

1. Fork repository
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

## 📝 License

ISC

## 👨‍💻 Tác giả

**datjpro**

- GitHub: [@datjpro](https://github.com/datjpro)

## 🎉 Bắt đầu ngay

```powershell
# 1. Clone project
git clone https://github.com/datjpro/shopacc_mysql.git
cd shopacc_mysql

# 2. Mở Docker Desktop (đợi 30 giây)

# 3. Deploy
.\deploy.ps1

# 4. Truy cập http://localhost:5173

# 🎮 Chúc bạn thành công!
```

---

**⭐ Nếu thấy hữu ích, hãy star repository này!**
