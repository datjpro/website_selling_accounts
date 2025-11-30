# 🚀 ShopAcc - Deployment Guide

## 📋 Prerequisites

### Required Software

- **Docker Desktop** (Windows/Mac) or **Docker Engine** (Linux)
- **Docker Compose** v2.0+
- **PowerShell** (Windows) hoặc **Bash** (Linux/Mac)

### System Requirements

- **RAM**: Minimum 4GB (Recommended 8GB+)
- **Disk**: 10GB free space
- **CPU**: 2 cores minimum

---

## 🎯 Quick Start (Local Development)

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd website_selling_accounts
```

### 2. Setup Environment Variables

Đã có sẵn file `.env` trong root folder. Kiểm tra và chỉnh sửa nếu cần:

```bash
# Root .env
POSTGRES_PASSWORD=shopacc_secure_password_2024
BACKEND_PORT=3000
FRONTEND_PORT=5173

# backend/.env
JWT_SECRET=shopacc_jwt_secret_key_change_in_production_2024
```

### 3. Deploy với PowerShell (Windows)

```powershell
.\deploy.ps1
```

### 4. Deploy thủ công (All OS)

```bash
# Build containers
docker-compose build

# Start services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f
```

---

## 🌐 Access URLs

| Service         | URL                   | Description    |
| --------------- | --------------------- | -------------- |
| **Frontend**    | http://localhost:5173 | React Vite App |
| **Backend API** | http://localhost:3000 | Express API    |
| **Database**    | localhost:5433        | PostgreSQL     |

### Default Admin Login

```
Email: admin@shopacc.com
Password: Admin@2024SecurePass
```

⚠️ **CHANGE THIS AFTER FIRST LOGIN!**

---

## 🔧 Common Commands

### Start/Stop Services

```bash
# Start
docker-compose up -d

# Stop
docker-compose down

# Restart
docker-compose restart

# Stop and remove volumes (⚠️ DELETES DATABASE)
docker-compose down -v
```

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f postgres
```

### Database Management

```bash
# Access PostgreSQL CLI
docker-compose exec postgres psql -U postgres -d website_selling_accounts

# Backup database
docker-compose exec postgres pg_dump -U postgres website_selling_accounts > backup.sql

# Restore database
docker-compose exec -T postgres psql -U postgres website_selling_accounts < backup.sql

# Reset database (⚠️ DELETES ALL DATA)
docker-compose down -v
docker-compose up -d
```

### Rebuild Containers

```bash
# Rebuild all
docker-compose build --no-cache

# Rebuild specific service
docker-compose build --no-cache backend
docker-compose build --no-cache frontend
```

---

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Windows - Kill process on port
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:5173 | xargs kill -9
```

### Database Connection Failed

1. Check PostgreSQL is running:

```bash
docker-compose ps postgres
```

2. Check logs:

```bash
docker-compose logs postgres
```

3. Verify credentials in `.env` files

### Frontend Can't Connect to Backend

1. Check backend is running:

```bash
docker-compose logs backend
```

2. Verify `VITE_API_URL` in frontend:

```bash
# Should be: http://localhost:3000/api
```

### Container Keeps Restarting

```bash
# Check logs for errors
docker-compose logs -f <service-name>

# Rebuild
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

---

## 📦 Production Deployment

### 🌩️ Option 1: VPS/Cloud (AWS, DigitalOcean, etc.)

#### 1. Setup Server

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

#### 2. Update Environment Variables

```bash
# backend/.env
NODE_ENV=production
JWT_SECRET=<generate-strong-random-secret>
DB_PASSWORD=<strong-password>

# docker-compose.yml - Update ports for production
ports:
  - "80:5173"  # Frontend
  - "3000:3000"  # Backend API
```

#### 3. Setup Nginx Reverse Proxy (Optional)

```nginx
# /etc/nginx/sites-available/shopacc
server {
    listen 80;
    server_name shopacc.com;

    location / {
        proxy_pass http://localhost:5173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

#### 4. Setup SSL with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d shopacc.com -d www.shopacc.com
```

#### 5. Deploy

```bash
git clone <repo>
cd website_selling_accounts
docker-compose up -d --build
```

---

### 🐳 Option 2: Docker Hub + Any Server

#### 1. Build and Push Images

```bash
# Login to Docker Hub
docker login

# Build images
docker build -t yourusername/shopacc-frontend:latest ./frontend
docker build -t yourusername/shopacc-backend:latest ./backend

# Push images
docker push yourusername/shopacc-frontend:latest
docker push yourusername/shopacc-backend:latest
```

#### 2. Deploy on Server

```bash
# Pull images
docker pull yourusername/shopacc-frontend:latest
docker pull yourusername/shopacc-backend:latest

# Run with docker-compose
docker-compose up -d
```

---

### ☸️ Option 3: Kubernetes (Advanced)

Create Kubernetes manifests:

```yaml
# k8s/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: shopacc-backend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: shopacc-backend
  template:
    metadata:
      labels:
        app: shopacc-backend
    spec:
      containers:
        - name: backend
          image: yourusername/shopacc-backend:latest
          ports:
            - containerPort: 3000
          env:
            - name: DB_HOST
              value: postgres-service
```

---

## 🔐 Security Checklist (Production)

- [ ] Change default admin password
- [ ] Update JWT_SECRET to strong random value
- [ ] Update DB_PASSWORD to strong password
- [ ] Enable HTTPS with SSL certificate
- [ ] Setup firewall rules
- [ ] Enable CORS only for your domain
- [ ] Setup rate limiting
- [ ] Regular backups
- [ ] Monitor logs
- [ ] Update dependencies regularly

---

## 📊 Monitoring

### Health Checks

```bash
# Backend health
curl http://localhost:3000/health

# Database health
docker-compose exec postgres pg_isready -U postgres
```

### Resource Usage

```bash
# Container stats
docker stats

# Disk usage
docker system df
```

---

## 🔄 Update Deployment

### Pull Latest Code

```bash
git pull origin main
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Zero-Downtime Update (Advanced)

```bash
# Build new images
docker-compose build

# Start new containers
docker-compose up -d --no-deps --scale backend=2

# Stop old containers
docker-compose up -d --no-deps --scale backend=1
```

---

## 📝 Environment Variables Reference

### Backend (.env)

```bash
PORT=3000
NODE_ENV=production
DB_HOST=postgres
DB_PORT=5432
DB_NAME=website_selling_accounts
DB_USER=postgres
DB_PASSWORD=<strong-password>
JWT_SECRET=<random-secret>
FRONTEND_URL=http://localhost:5173
```

### Frontend (via docker-compose.yml)

```bash
VITE_API_URL=http://localhost:3000/api
```

---

## 🆘 Support

### Get Help

- Check logs: `docker-compose logs -f`
- Restart service: `docker-compose restart <service>`
- Full reset: `docker-compose down -v && docker-compose up -d`

### Common Issues

1. **Port conflicts**: Change ports in docker-compose.yml
2. **Database errors**: Check init.sql for syntax errors
3. **Build fails**: Clear cache with `docker-compose build --no-cache`

---

## 🎉 Success!

Your ShopAcc website is now running:

- ✅ Frontend: http://localhost:5173
- ✅ Backend: http://localhost:3000
- ✅ Database: Ready with sample data

**Next Steps:**

1. Login as admin
2. Change default passwords
3. Add products
4. Test features
5. Deploy to production! 🚀
