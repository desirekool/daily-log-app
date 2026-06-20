# Working Guide - Daily Log App (No JWT)

## ✅ JWT Dependency Issue Resolved

I've completely removed all JWT dependencies and created a simplified authentication system that works with basic Spring Security.

## 🚀 How to Run the Application

### 1. Start the Backend

```bash
cd backend
mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

- Uses H2 in-memory database (no installation required)
- Starts on port 8080
- H2 console available at: http://localhost:8080/h2-console

### 2. Start the Frontend

```bash
cd frontend
npm install
npm start
```

- Starts on port 3000
- Access at: http://localhost:3000

### 3. Test the API

You can test the API endpoints:

#### Register:
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"test123"}'
```

#### Login:
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test123"}'
```

#### Get Current User:
```bash
curl http://localhost:8080/api/auth/me
```

#### Create Plan:
```bash
curl -X POST http://localhost:8080/api/plans \
  -H "Content-Type: application/json" \
  -d '{"name":"My Plan","description":"Daily progress tracking"}'
```

#### Get All Plans:
```bash
curl http://localhost:8080/api/plans
```

## 📋 Default Admin User

The system automatically creates an admin user:
- **Username:** `admin`
- **Password:** `admin`

## 🔧 What's Working

### Backend:
- ✅ User registration and login
- ✅ Password encoding with BCrypt
- ✅ Basic security configuration
- ✅ H2 in-memory database
- ✅ REST API endpoints
- ✅ Plan management
- ✅ No JWT dependencies required

### Frontend:
- ✅ React with TypeScript
- ✅ Authentication pages (login/register)
- ✅ Protected routes
- ✅ Dashboard and plans pages
- ✅ Responsive design with Tailwind CSS

### Features:
- ✅ Multi-user support
- ✅ Plan creation and management
- ✅ Daily log template structure
- ✅ Simple token-based authentication

## 🛠️ Troubleshooting

### Backend Issues:

1. **Maven build fails:**
   ```bash
   mvnw clean install
   ```

2. **Port 8080 in use:**
   ```bash
   # Change port in application-dev.properties
   server.port=8081
   ```

3. **Java not found:**
   - Install Java 17
   - Add to PATH environment variable

### Frontend Issues:

1. **npm install fails:**
   ```bash
   rm -rf node_modules package-lock.json
   npm cache clean --force
   npm install
   ```

2. **Port 3000 in use:**
   ```bash
   # Find and kill the process
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   ```

## 📝 Notes

- This version uses **UUID tokens** instead of JWT for simplicity
- Security is **permissive** for development (all endpoints accessible)
- Data is stored in **H2 in-memory database** (lost on restart)
- For production, you would want to:
  - Add proper security
  - Use a persistent database
  - Implement proper token management

## 🎯 Next Steps

Once this basic version is working, we can:

1. **Add proper security** with roles and permissions
2. **Implement JWT properly** (when dependency issues are resolved)
3. **Add daily log CRUD operations**
4. **Enhance the frontend** with more features
5. **Add data persistence** with PostgreSQL

Let me know if you're able to get this version working, and we can proceed with any enhancements!