@echo off
echo Starting MINERVASUTRA...
echo.

echo Checking if MongoDB is running...
tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo MongoDB is running.
) else (
    echo MongoDB is not running. Please start MongoDB first.
    echo You can start it from Services or run: net start MongoDB
    pause
    exit /b 1
)

echo.
echo Installing dependencies if needed...
if not exist node_modules (
    echo Installing frontend dependencies...
    npm install
)

if not exist server\node_modules (
    echo Installing backend dependencies...
    cd server
    npm install
    cd ..
)

echo.
echo Starting both frontend and backend servers...
echo Frontend will be available at: http://localhost:5173
echo Backend API will be available at: https://hr-management-r6bh.vercel.app
echo.

npm run start:dev