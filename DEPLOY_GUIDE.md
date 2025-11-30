# 🚀 HƯỚNG DẪN DEPLOY NHANH

## ⚠️ YÊU CẦU

**BẮT BUỘC: Docker Desktop phải được cài đặt và ĐANG CHẠY**

### Cài đặt Docker Desktop (nếu chưa có)

1. Download: https://www.docker.com/products/docker-desktop/
2. Cài đặt và khởi động Docker Desktop
3. Đợi Docker Desktop hiển thị "Docker Desktop is running"

---

## 🎯 CÁCH 1: Deploy Tự Động (Recommended)

### Bước 1: Mở Docker Desktop

```
- Nhấn Windows key
- Gõ "Docker Desktop"
- Click mở
- Đợi icon Docker ở taskbar chuyển sang màu xanh
```

### Bước 2: Chạy Deploy Script

```powershell
# Mở PowerShell tại folder dự án, chạy:
.\deploy.ps1
```

**Script sẽ tự động:**

- ✅ Dừng containers cũ
- ✅ Build images mới
- ✅ Start tất cả services
- ✅ Khởi tạo database với sample data

### Bước 3: Truy cập

- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- Admin login:
  - Email: `admin@shopacc.com`
  - Password: `Admin@2024SecurePass`

---

## 🎯 CÁCH 2: Deploy Thủ Công

### 1. Start Docker Desktop

Nhấn đúp vào biểu tượng Docker Desktop trên màn hình hoặc:

```powershell
Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"
```

### 2. Đợi Docker sẵn sàng (30-60 giây)

```powershell
# Kiểm tra Docker đã ready chưa
docker ps
# Nếu thấy danh sách containers (có thể rỗng) → OK!
```

### 3. Build và Start

```powershell
# Build images
docker-compose build

# Start services
docker-compose up -d

# Kiểm tra status
docker-compose ps
```

### 4. Xem logs (nếu cần debug)

```powershell
docker-compose logs -f
```

---

## ✅ KIỂM TRA DEPLOYMENT THÀNH CÔNG

### Check Services Running

```powershell
docker-compose ps
```

**Output mong đợi:**

```
NAME                              STATUS
website_selling_accounts-backend-1    running
website_selling_accounts-frontend-1   running
website_selling_accounts-postgres-1   running
```

### Check Frontend

```
Mở browser: http://localhost:5173
- Phải thấy trang chủ ShopAcc
```

### Check Backend API

```
Mở browser: http://localhost:3000/api
- Phải thấy response JSON
```

### Check Database

```powershell
docker-compose exec postgres psql -U postgres -d website_selling_accounts -c "\dt"
# Phải thấy 9 tables: users, products, orders, ...
```

---

## 🐛 XỬ LÝ LỖI THƯỜNG GẶP

### ❌ Lỗi: "The system cannot find the file specified"

**Nguyên nhân:** Docker Desktop chưa chạy

**Giải pháp:**

1. Mở Docker Desktop
2. Đợi icon Docker ở taskray chuyển sang xanh
3. Chạy lại `.\deploy.ps1`

---

### ❌ Lỗi: "Port 5173 is already in use"

**Nguyên nhân:** Port đang bị chiếm

**Giải pháp:**

```powershell
# Tìm process đang dùng port
netstat -ano | findstr :5173

# Kill process (thay <PID> bằng số PID tìm được)
taskkill /PID <PID> /F

# Hoặc đổi port trong docker-compose.yml:
# "5174:5173"  # Dùng port 5174 thay vì 5173
```

---

### ❌ Lỗi: "Backend container keeps restarting"

**Nguyên nhân:** Lỗi trong code hoặc database chưa ready

**Giải pháp:**

```powershell
# Xem logs backend
docker-compose logs backend

# Restart tất cả
docker-compose down
docker-compose up -d
```

---

### ❌ Lỗi: "Database connection failed"

**Nguyên nhân:** PostgreSQL chưa khởi động xong

**Giải pháp:**

```powershell
# Đợi thêm 10 giây rồi restart backend
Start-Sleep -Seconds 10
docker-compose restart backend
```

---

## 🔄 LỖI NGHIÊM TRỌNG - RESET HOÀN TOÀN

Nếu mọi cách đều fail, reset tất cả:

```powershell
# Dừng và xóa containers + volumes
docker-compose down -v

# Xóa images cũ
docker system prune -a -f

# Build lại từ đầu
docker-compose build --no-cache

# Start lại
docker-compose up -d

# Đợi 30 giây
Start-Sleep -Seconds 30

# Check logs
docker-compose logs -f
```

⚠️ **CẢNH BÁO:** Lệnh này sẽ XÓA TẤT CẢ DỮ LIỆU DATABASE!

---

## 🎯 SAU KHI DEPLOY THÀNH CÔNG

### Bước tiếp theo:

1. ✅ Truy cập http://localhost:5173
2. ✅ Login với tài khoản admin
3. ✅ Đổi password admin ngay lập tức
4. ✅ Thêm sản phẩm mẫu
5. ✅ Test các chức năng
6. ✅ Chuẩn bị deploy lên production

### Admin Panel:

- URL: http://localhost:5173/admin
- Dashboard, Products, Orders, Users management

---

## 📞 SUPPORT

### Nếu vẫn gặp lỗi:

1. Check Docker Desktop đang chạy
2. Restart Docker Desktop
3. Chạy lại `.\deploy.ps1`
4. Check logs: `docker-compose logs -f`

### Useful Commands:

```powershell
# Stop tất cả
docker-compose down

# Start lại
docker-compose up -d

# Xem logs live
docker-compose logs -f

# Check status
docker-compose ps

# Restart 1 service
docker-compose restart backend
```

---

## 🎉 DONE!

Sau khi deploy thành công:

- ✅ Website: http://localhost:5173
- ✅ API: http://localhost:3000
- ✅ Database có sẵn sample data
- ✅ Admin account sẵn sàng

**Happy Coding! 🚀**
