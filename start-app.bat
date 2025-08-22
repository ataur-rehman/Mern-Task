@echo off
echo ========================================
echo  MERN Timesheet Application Startup
echo ========================================
echo.

echo Starting Backend Test Server...
cd /d "E:\Mern Task\timesheet-backend"
start "Backend Server" cmd /k "npm run test-server"

echo Waiting 3 seconds for backend to start...
timeout /t 3 /nobreak >nul

echo Starting Frontend...
cd /d "E:\Mern Task\timesheet-frontend"
start "Frontend Server" cmd /k "npm start"

echo.
echo ========================================
echo  Startup Complete!
echo ========================================
echo.
echo Backend (API): http://localhost:5000
echo Frontend (UI): http://localhost:3000
echo.
echo The application will open automatically in your browser.
echo.
echo Press any key to exit this window...
pause >nul
