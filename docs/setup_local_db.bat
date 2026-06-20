@echo off
REM Simple script to help set up local database

echo Setting up local development environment...
echo.

echo 1. Please make sure you have:
echo    - Java 17 installed
echo    - PostgreSQL installed and running
echo    - Node.js 18+ installed
echo.

echo 2. Create the database:
echo    Open pgAdmin or psql and run:
echo    CREATE DATABASE daily_log_db;
echo    CREATE USER postgres WITH PASSWORD 'postgres';
echo    GRANT ALL PRIVILEGES ON DATABASE daily_log_db TO postgres;
echo.

echo 3. Start the backend:
echo    cd backend
echo    mvnw spring-boot:run
echo.

echo 4. In another terminal, start the frontend:
echo    cd frontend
echo    npm install
echo    npm start
echo.

echo 5. Access the application at: http://localhost:3000

pause