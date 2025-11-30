# ShopAcc Deployment Script
# Usage: .\deploy.ps1

Write-Host "🚀 Starting ShopAcc Deployment..." -ForegroundColor Cyan

# Stop existing containers
Write-Host "`n📦 Stopping existing containers..." -ForegroundColor Yellow
docker-compose down

# Clean up old images
Write-Host "`n🧹 Cleaning up old images..." -ForegroundColor Yellow
docker system prune -f

# Build and start containers
Write-Host "`n🔨 Building containers..." -ForegroundColor Yellow
docker-compose build --no-cache

Write-Host "`n▶️  Starting containers..." -ForegroundColor Green
docker-compose up -d

# Wait for services to be ready
Write-Host "`n⏳ Waiting for services to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Check status
Write-Host "`n✅ Checking container status..." -ForegroundColor Cyan
docker-compose ps

# Show logs
Write-Host "`n📋 Recent logs:" -ForegroundColor Cyan
docker-compose logs --tail=50

Write-Host "`n✨ Deployment complete!" -ForegroundColor Green
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "Backend:  http://localhost:3000" -ForegroundColor Cyan
Write-Host "Database: localhost:5433" -ForegroundColor Cyan

Write-Host "`n📊 To view logs: docker-compose logs -f" -ForegroundColor Yellow
Write-Host "🛑 To stop: docker-compose down" -ForegroundColor Yellow
