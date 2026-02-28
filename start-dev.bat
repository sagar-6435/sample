@echo off
REM LifeLink Development Startup Script for Windows

echo Starting LifeLink Development Environment...

REM Start ML Service
echo Starting ML Service...
cd ml-service
if not exist venv (
    echo Creating Python virtual environment...
    python -m venv venv
)
call venv\Scripts\activate
pip install -q -r requirements.txt
start "ML Service" cmd /k python main.py
cd ..

REM Wait for ML service to start
timeout /t 3 /nobreak >nul

REM Start Backend API
echo Starting Backend API...
cd backend
if not exist node_modules (
    echo Installing backend dependencies...
    call npm install
)
start "Backend API" cmd /k npm run dev
cd ..

REM Start Web Client
echo Starting Web Client...
cd client
if not exist node_modules (
    echo Installing web client dependencies...
    call npm install
)
start "Web Client" cmd /k npm run dev
cd ..

REM Start Mobile App
echo Starting Mobile App...
cd mobile
if not exist node_modules (
    echo Installing mobile dependencies...
    call npm install
)
start "Mobile App" cmd /k npm start
cd ..

echo.
echo All services started!
echo.
echo ML Service:    http://localhost:8000
echo Backend API:   http://localhost:3000
echo Web Client:    http://localhost:5173
echo Mobile App:    Check Expo DevTools
echo.
echo Close the terminal windows to stop services
