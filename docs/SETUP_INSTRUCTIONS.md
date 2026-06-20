# Daily Log App - Setup Instructions

## Project Structure

```
daily-log-app/
├── backend/              # Spring Boot backend
│   ├── src/              # Java source code
│   ├── pom.xml           # Maven configuration
│   └── Dockerfile        # Backend Docker configuration
│
├── frontend/             # React frontend
│   ├── src/              # React source code
│   ├── package.json      # Node.js dependencies
│   └── Dockerfile        # Frontend Docker configuration
│
├── docker-compose.yml    # Docker Compose configuration
├── README.md             # Project documentation
└── SETUP_INSTRUCTIONS.md # This file
```

## Requirements

- Docker
- Docker Compose
- Java 17 (for local backend development)
- Node.js 18+ (for local frontend development)

## Running with Docker (Recommended)

1. **Build and start the containers:**
   ```bash
   docker-compose up --build
   ```

2. **Access the application:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8080/api

3. **Stop the containers:**
   ```bash
   docker-compose down
   ```

## Running Locally for Development

### Backend (Spring Boot)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Start PostgreSQL and Redis (using Docker):
   ```bash
   docker run --name daily-log-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=daily_log_db -p 5432:5432 -d postgres:15-alpine
   docker run --name daily-log-redis -p 6379:6379 -d redis:7-alpine
   ```

3. Build and run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```

### Frontend (React)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Default Credentials

- Username: admin
- Password: admin

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user

### Plans
- `GET /api/plans` - Get all plans
- `GET /api/plans/{id}` - Get plan by ID
- `POST /api/plans` - Create new plan
- `PUT /api/plans/{id}` - Update plan
- `DELETE /api/plans/{id}` - Delete plan

## Features Implemented

### Backend (Spring Boot)
- ✅ User authentication with JWT
- ✅ Spring Security configuration
- ✅ JPA entities for User, Plan, DailyLog, etc.
- ✅ REST API controllers
- ✅ PostgreSQL database integration
- ✅ Redis session storage
- ✅ Docker containerization

### Frontend (React)
- ✅ React with TypeScript
- ✅ Authentication system (login/register)
- ✅ Protected routes
- ✅ Multiple page layout
- ✅ Plan management interface
- ✅ Daily log viewing interface
- ✅ Responsive design with Tailwind CSS
- ✅ Docker containerization

### Infrastructure
- ✅ Docker Compose for multi-container setup
- ✅ PostgreSQL database container
- ✅ Redis container for session storage
- ✅ Nginx for frontend serving
- ✅ Network configuration for container communication

## Next Steps for Development

1. **Implement the remaining CRUD operations** for DailyLog, PlanColumn, and LogEntry
2. **Add form validation** on both frontend and backend
3. **Implement real-time updates** using WebSockets or Server-Sent Events
4. **Add more comprehensive error handling**
5. **Implement data export/import** functionality
6. **Add unit and integration tests**
7. **Implement proper logging**
8. **Add monitoring and health checks**

## Troubleshooting

### Docker Issues
- Ensure Docker Desktop is running
- Check container logs: `docker logs <container-name>`
- Clean up containers: `docker-compose down -v`

### Database Issues
- Check PostgreSQL connection: `psql -h localhost -U postgres -d daily_log_db`
- Reset database: `docker volume rm daily-log-app_postgres_data`

### Frontend Issues
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Check browser console for errors

### Backend Issues
- Check Spring Boot logs for errors
- Verify database connection in application.properties
- Clean Maven build: `./mvnw clean install`