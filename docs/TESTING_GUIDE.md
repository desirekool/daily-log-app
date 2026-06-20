# Testing Guide for Daily Log App

## Quick Test Without JWT

Since we're having issues with the JWT dependency, I've created a simplified authentication system that doesn't require JWT. Here's how to test it:

### 1. Start the Backend

```bash
cd backend
mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

### 2. Test the API Endpoints

You can test the API using curl, Postman, or any HTTP client:

#### Register a new user:
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"testpass"}'
```

#### Login:
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass"}'
```

#### Get current user:
```bash
curl -X GET http://localhost:8080/api/auth/me
```

#### Create a plan:
```bash
curl -X POST http://localhost:8080/api/plans \
  -H "Content-Type: application/json" \
  -d '{"name":"My Learning Plan","description":"Track my daily learning progress"}'
```

#### Get all plans:
```bash
curl -X GET http://localhost:8080/api/plans
```

### 3. Start the Frontend

```bash
cd frontend
npm install
npm start
```

### 4. Test the Frontend

1. Open http://localhost:3000 in your browser
2. Try registering a new user
3. Login with your credentials
4. Navigate to the dashboard and plans pages

## Troubleshooting

### If you get "Package not found" errors:

1. **Clean Maven cache:**
   ```bash
   cd backend
   mvnw clean
   ```

2. **Try building again:**
   ```bash
   mvnw install -DskipTests
   ```

3. **Check your internet connection** - Maven needs to download dependencies

### If the backend fails to start:

1. **Check the logs** for specific error messages
2. **Try a different port** by changing `server.port` in `application-dev.properties`
3. **Make sure no other application** is using port 8080

### If the frontend fails to start:

1. **Delete node_modules and reinstall:**
   ```bash
   cd frontend
   rm -rf node_modules package-lock.json
   npm install
   ```

2. **Try a different port** by changing the port in `package.json`

## Alternative: Use the Admin User

The system automatically creates an admin user if it doesn't exist:
- **Username:** admin
- **Password:** admin

You can use these credentials to login without registering.

## Next Steps

Once you have the basic system working, we can:

1. **Fix the JWT dependency** issue
2. **Implement proper security** with JWT tokens
3. **Add more features** like daily log creation, editing, etc.
4. **Improve the frontend** with better UI/UX

Let me know if you're able to get the basic version working, and we can proceed with enhancing it!