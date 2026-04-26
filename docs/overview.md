# Overview

## Mục tiêu
- Bán tài khoản game trực tuyến qua web.
- Tách biệt rõ frontend, backend và database.
- Xây dựng API theo từng phase, bắt đầu từ Catalog.

## Runtime hiện tại
- Frontend: Vite dev server tại `localhost:5173`
- Backend: Docker container tại `localhost:3000`
- Database: MySQL local tại `localhost:3306`
- Database name: `shopacc_mysql`

## Kiến trúc hiện tại
- Frontend gọi backend qua REST API.
- Backend dùng Express + TypeScript.
- Backend tự chạy `ensureDatabaseSchema()` khi start.
- Schema nền tảng hiện có 9 bảng trong MySQL.

## Tài liệu nguồn sự thật
- Setup database: `backend/DATABASE_SETUP.md`
- Schema database: `backend/DATABASE_SCHEMA.md`
- Roadmap API: `docs/api-roadmap.md`
