@echo off
echo ========================================
echo   ShopAcc - Quick Deploy
echo ========================================
echo.

echo [1/4] Checking Docker Desktop...
docker ps >nul 2>&1
if errorlevel 1 (
    echo ERROR: Docker Desktop is not running!
    echo.
    echo Please:
    echo 1. Open Docker Desktop
    echo 2. Wait for it to start completely
    echo 3. Run this script again
    echo.
    pause
    exit /b 1
)
echo OK - Docker is running

echo.
echo [2/4] Stopping old containers...
docker-compose down

echo.
echo [3/4] Building images...
docker-compose build --no-cache

echo.
echo [4/4] Starting services...
docker-compose up -d

echo.
echo ========================================
echo   Waiting for services to start...
echo ========================================
timeout /t 10 /nobreak >nul

echo.
echo Checking container status...
docker-compose ps

echo.
echo ========================================
echo   DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:3000
echo Database: localhost:5433
echo.
echo Admin Login:
echo   Email: admin@shopacc.com
echo   Password: Admin@2024SecurePass
echo.
echo To view logs: docker-compose logs -f
echo To stop: docker-compose down
echo.
pause
