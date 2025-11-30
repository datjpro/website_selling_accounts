# 🚀 ShopAcc - Quick Start

## ⚡ Deploy trong 3 bước

### 1️⃣ Mở Docker Desktop

- Nhấn Windows key → gõ "Docker Desktop" → Enter
- Đợi icon Docker ở taskbar chuyển màu xanh (khoảng 30-60 giây)

### 2️⃣ Chạy script deploy

**PowerShell:**

```powershell
.\deploy.ps1
```

**Hoặc Command Prompt:**

```cmd
deploy.bat
```

### 3️⃣ Truy cập website

```
Frontend: http://localhost:5173
Backend:  http://localhost:3000

Admin Login:
├─ Email: admin@shopacc.com
└─ Password: Admin@2024SecurePass
```

---

## 📋 Checklist

- [ ] Docker Desktop đã được cài đặt
- [ ] Docker Desktop ĐANG CHẠY (icon xanh ở taskbar)
- [ ] Đã chạy `.\deploy.ps1` hoặc `deploy.bat`
- [ ] Đợi khoảng 2-3 phút để services khởi động
- [ ] Truy cập http://localhost:5173

---

## 🐛 Lỗi thường gặp

### "Docker is not running"

→ Mở Docker Desktop và đợi nó khởi động xong

### "Port already in use"

→ Dừng process đang dùng port:

```powershell
netstat -ano | findstr :5173
taskkill /PID <số_PID> /F
```

### "Container keeps restarting"

→ Xem logs:

```powershell
docker-compose logs backend
```

### Reset hoàn toàn

```powershell
docker-compose down -v
docker-compose up -d
```

---

## 📚 Tài liệu chi tiết

- **Deployment Guide**: `README_DEPLOYMENT.md`
- **Quick Deploy**: `DEPLOY_GUIDE.md`
- **System Assessment**: `SYSTEM_ASSESSMENT.md`
- **Database Schema**: `backend/DATABASE_SCHEMA.md`
- **Features**: `frontend/FEATURES.md`

---

## 🎯 Sau khi deploy

1. Đổi password admin
2. Thêm sản phẩm
3. Test các tính năng
4. Sẵn sàng đưa lên production! 🚀

**Chúc bạn thành công! 🎉**
