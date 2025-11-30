# ⚠️ DOCKER DESKTOP CHƯA CHẠY

## Bạn cần làm gì ngay bây giờ:

### Bước 1: Mở Docker Desktop

#### Cách 1: Từ Start Menu

1. Nhấn phím **Windows** (phím có logo Windows)
2. Gõ: **Docker Desktop**
3. Nhấn **Enter**

#### Cách 2: Double-click icon

- Tìm biểu tượng **Docker Desktop** trên Desktop
- Nhấn đúp chuột vào nó

#### Cách 3: Từ PowerShell

```powershell
Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"
```

---

### Bước 2: Đợi Docker khởi động

Sau khi mở Docker Desktop:

1. ⏳ Đợi khoảng **30-60 giây**
2. 👀 Xem icon Docker ở **taskbar** (góc dưới bên phải màn hình)
3. ✅ Đợi icon Docker chuyển sang **màu xanh**
4. ✅ Hoặc xem chữ "**Docker Desktop is running**" trong cửa sổ Docker

**HÌnh ảnh icon:**

- ❌ Icon xám/trắng = Docker chưa sẵn sàng
- ✅ Icon xanh = Docker đã sẵn sàng

---

### Bước 3: Chạy lại deploy

Sau khi Docker đã chạy (icon xanh), quay lại PowerShell và chạy:

```powershell
# Cách 1: PowerShell script
.\deploy.ps1

# Cách 2: Batch file
.\deploy.bat

# Cách 3: Thủ công
docker-compose build
docker-compose up -d
```

---

## 🔍 Kiểm tra Docker đã sẵn sàng chưa?

Chạy lệnh này trong PowerShell:

```powershell
docker ps
```

### Nếu thấy:

- ✅ **Bảng danh sách containers** (có thể rỗng) → Docker OK!
- ❌ **Error: "cannot find the file specified"** → Docker chưa chạy, đợi thêm

---

## ❓ Docker Desktop không mở được?

### Kiểm tra đã cài Docker Desktop chưa:

```powershell
Test-Path "C:\Program Files\Docker\Docker\Docker Desktop.exe"
```

### Nếu kết quả là **False**:

→ Bạn chưa cài Docker Desktop!

**Download và cài đặt:**

1. Truy cập: https://www.docker.com/products/docker-desktop/
2. Download **Docker Desktop for Windows**
3. Cài đặt (yêu cầu khởi động lại máy)
4. Sau khi cài xong, quay lại **Bước 1** ở trên

---

## 🎯 Timeline dự kiến

```
00:00 - Mở Docker Desktop
00:30 - Docker đang khởi động... (đợi)
01:00 - Docker sẵn sàng! (icon xanh)
01:10 - Chạy .\deploy.ps1
03:00 - Build images (đợi)
05:00 - Start services
05:30 - ✅ DONE! Truy cập http://localhost:5173
```

**Tổng thời gian: ~5-6 phút**

---

## 📞 Còn lỗi?

Nếu Docker Desktop vẫn không chạy:

1. **Khởi động lại máy** (đơn giản nhất)
2. **Reinstall Docker Desktop**
3. Check WSL2: `wsl --status` (Docker cần WSL2 trên Windows)

---

## ✅ CHECKLIST

- [ ] Docker Desktop đã được cài đặt
- [ ] Đã mở Docker Desktop
- [ ] Icon Docker ở taskbar đã chuyển sang màu xanh
- [ ] Lệnh `docker ps` chạy không lỗi
- [ ] Sẵn sàng chạy `.\deploy.ps1`

---

**Sau khi Docker Desktop chạy, quay lại chạy script deploy! 🚀**
