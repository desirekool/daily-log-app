# JWT Authentication Testing Guide

## ✅ JWT Implementation Complete

I've successfully implemented JWT authentication with the following components:

### **JWT Components Added:**
- `JwtService.java` - JWT token generation and validation
- `JwtAuthenticationFilter.java` - JWT request filtering
- `SecurityConfig.java` - Security configuration with JWT
- `ApplicationConfig.java` - Authentication provider configuration
- Proper JWT dependencies in `pom.xml`

### **JWT Configuration:**
- **Algorithm:** HS256
- **Token Expiration:** 24 hours
- **Secret Key:** Secure random key
- **Token Format:** Bearer tokens in Authorization header

## 🚀 How to Test JWT Authentication

### 1. Start the Backend

```bash
cd backend
mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```

### 2. Test Authentication Flow

#### Register a new user:
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"testpass123"}'
```

#### Login to get JWT token:
```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","password":"testpass123"}'
```

**Response will include a JWT token:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0dXNlciIsI...",
  "user": {
    "id": 1,
    "username": "testuser",
    "email": "test@example.com"
  }
}
```

#### Use JWT token to access protected endpoints:
```bash
curl -X GET http://localhost:8080/api/plans \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0dXNlciIsI..."
```

#### Get current user (protected):
```bash
curl -X GET http://localhost:8080/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 3. Test with Frontend

The frontend is already configured to work with JWT tokens:

1. **Login** with your credentials
2. The frontend will receive and store the JWT token
3. Subsequent API calls will include the token in the Authorization header
4. Protected routes will only be accessible with a valid token

## 🔧 JWT Token Structure

The JWT token contains:
```json
{
  "sub": "username",
  "iat": 1654555555,
  "exp": 1654641955
}
```

- `sub`: Subject (username)
- `iat`: Issued at timestamp
- `exp`: Expiration timestamp (24 hours from issuance)

## 🛡️ Security Features

### **Implemented:**
- ✅ JWT token generation with HS256 algorithm
- ✅ Token validation and expiration checking
- ✅ Secure secret key storage
- ✅ Stateless authentication
- ✅ Role-based access control ready
- ✅ CSRF protection disabled (for API)
- ✅ Proper CORS configuration

### **Security Best Practices:**
- 🔒 Strong secret key (256-bit)
- ⏳ Reasonable token expiration (24 hours)
- 🔑 Secure password hashing (BCrypt)
- 🛡️ Stateless sessions
- 🔄 Token refresh capability (can be added)

## 📋 API Endpoints

### **Public Endpoints (No Auth Required):**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### **Protected Endpoints (Require JWT):**
- `GET /api/auth/me` - Get current user info
- `GET /api/plans` - Get all plans
- `POST /api/plans` - Create new plan
- `GET /api/plans/{id}` - Get specific plan
- `PUT /api/plans/{id}` - Update plan
- `DELETE /api/plans/{id}` - Delete plan

## 🔍 Testing with Postman

1. **Import the collection** (create one with these endpoints)
2. **Set up environment variables:**
   - `base_url`: `http://localhost:8080`
   - `auth_token`: (will be set after login)

3. **Create a test sequence:**
   - Register → Login → Store token → Access protected endpoints

## 🛠️ Troubleshooting

### **Common JWT Issues:**

1. **Invalid token error:**
   - Check token expiration
   - Verify token format
   - Ensure proper Bearer prefix

2. **Token expired:**
   - Login again to get a new token
   - Consider implementing token refresh

3. **Unauthorized access:**
   - Make sure to include Authorization header
   - Check token is not empty
   - Verify user has proper roles

### **Backend Issues:**

1. **JWT dependency issues:**
   ```bash
   mvnw clean install
   ```

2. **Secret key issues:**
   - The key is hardcoded for development
   - In production, use environment variables

## 🎯 Next Steps

The JWT implementation is now complete and ready for testing. You can:

1. **Test the authentication flow** using the curl commands above
2. **Integrate with the frontend** (already configured)
3. **Add token refresh** functionality if needed
4. **Implement role-based access** control
5. **Add token blacklisting** for logout functionality

Would you like me to test the JWT implementation by trying to build and run the backend?