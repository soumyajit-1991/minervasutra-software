@echo off
echo Pharmacy Management System - Setup Verification
echo ================================================
echo.

echo 1. Checking Node.js installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
) else (
    echo [OK] Node.js is installed
    node --version
)

echo.
echo 2. Checking npm installation...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] npm is not installed or not in PATH
) else (
    echo [OK] npm is installed
    npm --version
)

echo.
echo 3. Checking MongoDB installation...
mongod --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [WARNING] MongoDB is not installed or not in PATH
    echo Please install MongoDB from https://www.mongodb.com/try/download/community
) else (
    echo [OK] MongoDB is installed
)

echo.
echo 4. Checking if MongoDB service is running...
tasklist /FI "IMAGENAME eq mongod.exe" 2>NUL | find /I /N "mongod.exe">NUL
if "%ERRORLEVEL%"=="0" (
    echo [OK] MongoDB service is running
) else (
    echo [WARNING] MongoDB service is not running
    echo Please start MongoDB service or run: net start MongoDB
)

echo.
echo 5. Checking project files...
if exist package.json (
    echo [OK] Frontend package.json found
) else (
    echo [ERROR] Frontend package.json not found
)

if exist server\package.json (
    echo [OK] Backend package.json found
) else (
    echo [ERROR] Backend package.json not found
)

if exist .env (
    echo [OK] Frontend .env file found
) else (
    echo [WARNING] Frontend .env file not found - will use defaults
)

if exist server\.env (
    echo [OK] Backend .env file found
) else (
    echo [WARNING] Backend .env file not found - will use defaults
)

echo.
echo 6. Checking dependencies...
if exist node_modules (
    echo [OK] Frontend dependencies installed
) else (
    echo [WARNING] Frontend dependencies not installed - run: npm install
)

if exist server\node_modules (
    echo [OK] Backend dependencies installed
) else (
    echo [WARNING] Backend dependencies not installed - run: cd server && npm install
)

echo.
echo Setup verification complete!
echo.
echo To start the application:
echo 1. Make sure MongoDB is running
echo 2. Run: npm run start:dev
echo 3. Open http://localhost:5173 in your browser
echo.
pause