# Quick Start Guide (Without Docker)

## Option 1: Using H2 In-Memory Database (Easiest)

### 1. Start the Backend

```bash
cd backend
mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

- The backend will start with an in-memory H2 database
- Access H2 console at: http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:daily_log_db`
  - Username: `sa`
  - Password: (leave empty)

### 2. Start the Frontend

```bash
cd frontend
npm install
npm start
```

- The frontend will start at: http://localhost:3000

### 3. Login

- Username: `admin`
- Password: `admin`

## Option 2: Using PostgreSQL (If you have it installed)

### 1. Set up PostgreSQL

```sql
CREATE DATABASE daily_log_db;
CREATE USER postgres WITH PASSWORD 'postgres';
GRANT ALL PRIVILEGES ON DATABASE daily_log_db TO postgres;
```

### 2. Start the Backend

```bash
cd backend
mvnw spring-boot:run
```

### 3. Start the Frontend (same as above)

```bash
cd frontend
npm install
npm start
```

## Troubleshooting

### Backend Issues

1. **Port already in use**: Change port in `application.properties`
2. **Java not found**: Install Java 17 and add to PATH
3. **Maven issues**: Try `mvnw clean install` first

### Frontend Issues

1. **Node.js not found**: Install Node.js 18+
2. **npm install fails**: Delete `node_modules` and `package-lock.json`, then try again
3. **Port 3000 in use**: Change port in `package.json` or kill the process

### Common Commands

- **Check if port is in use** (Windows):
  ```bash
  netstat -ano | findstr :3000
  ```

- **Kill process on port** (Windows):
  ```bash
  taskkill /PID <PID> /F
  ```

- **Check Java version**:
  ```bash
  java -version
  ```

- **Check Node.js version**:
  ```bash
  node -v
  npm -v
  ```

## Alternative: Use SQLite

If you prefer SQLite, I can modify the configuration to use SQLite instead. Let me know if you'd like that option.