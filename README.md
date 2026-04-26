# ShopAcc

ShopAcc là nền tảng bán tài khoản game trực tuyến.

## Chạy dự án bằng 1 lệnh (1 terminal)

### Cách dùng chính
```bash
npm run dev
```

Lệnh này chạy đồng thời:
- Backend: `http://localhost:3000`
- Frontend: `http://localhost:5173`

Yêu cầu trước khi chạy:
- MySQL local đang chạy ở `localhost:3306`
- Tài khoản dev: `root / 123456`

## Cách dùng script

### Windows PowerShell
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\dev.ps1
```

### WSL / Linux / Git Bash (tmux)
```bash
bash ./scripts/dev-tmux.sh
```

## Cấu trúc dự án
- `frontend/`: React + Vite
- `backend/`: Express + TypeScript + MySQL
- `docs/`: tài liệu kiến trúc, flow, convention
- `scripts/dev.ps1`: chạy dự án 1 terminal trên Windows
- `scripts/dev-tmux.sh`: chạy dự án với tmux

## Ghi chú
- Backend không chạy Docker cổng `3000`.
- Backend local tự đảm bảo DB `shopacc_mysql` và schema khởi tạo.