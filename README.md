# Daily Log App

A full-stack application for tracking daily progress across multiple plans with a 4-phase lifecycle (Setup → Hydrate → Execute → Review).

## Architecture

```
daily-log-app/
├── backend/           # Spring Boot 3.3 + Java 17
│   ├── src/
│   └── Dockerfile
├── frontend/          # React 18 + TypeScript + Tailwind
│   ├── src/
│   └── Dockerfile
├── docs/              # Project documentation and notes
├── docker-compose.yml # PostgreSQL + Redis + backend + frontend
└── README.md
```

**Backend**: Spring Boot 3.3, JPA/Hibernate, Spring Security (cookies), Lombok, H2 (dev) / PostgreSQL (prod/test)

**Frontend**: React 18, TypeScript, Tailwind CSS, Radix UI, Lucide icons, MDXEditor

## Quick Start (Development)

### Prerequisites
- Java 17+
- Node.js 18+
- Maven (or use `mvnw` in the backend directory)
- Docker Desktop (for prod/test profiles)

### Run locally (dev profile — H2 in-memory)

**Terminal 1 — Backend:**
```bash
cd backend
.\mvnw spring-boot:run -Dspring-boot.run.profiles=dev
# or omit -Dspring-boot.run.profiles for default H2 config
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm install
npm start
```

The app is available at `http://localhost:3000`. Backend API is proxied from port 3000 to 8080 by CRA.

### Default login
- Username: `ahmed`
- Password: `password`

## Run with Docker (prod profile — PostgreSQL + Redis)

```bash
docker-compose up --build
```

Available at `http://localhost:3000`.

## Profiles

| Profile  | Database          | Use case          |
|----------|-------------------|-------------------|
| *(none)* | H2 in-memory      | Quick local dev   |
| `dev`    | H2 in-memory      | Explicit local dev|
| `prod`   | PostgreSQL (Docker)| Production        |
| `test`   | PostgreSQL (Docker)| Staging / CI      |

## Phase Lifecycle

Each plan progresses through 4 phases:

1. **SETUP** — Define the plan schema (columns, sections). PlanModal form editor.
2. **HYDRATE** — Fill in activities via the Markdown editor (Edit tab). Read-only on View tab.
3. **EXECUTE** — Track daily progress. LogModal with readonly day/activity, editable comment, checked tracker. Auto-pushes to REVIEW when all entries complete.
4. **REVIEW** — Read-only. All data is locked.

## Tech Stack

- **Backend**: Spring Boot 3.3.1, Spring Data JPA, Spring Security, H2, PostgreSQL, Redis, Lombok
- **Frontend**: React 18, TypeScript, Tailwind CSS, Radix UI, Lucide React, MDXEditor, axios, Sentry
- **Infrastructure**: Docker, Docker Compose, Nginx

## Testing

### Backend
```bash
cd backend
.\mvnw test
```

### Frontend
```bash
cd frontend
npm test
```

## Project Structure

```
src/
├── main/
│   ├── java/com/dailylog/dailylogapp/
│   │   ├── config/       # Security, CORS, seed data
│   │   ├── controller/   # REST controllers
│   │   ├── dto/          # Request/Response DTOs
│   │   ├── model/        # JPA entities
│   │   ├── repository/   # Spring Data repositories
│   │   └── service/      # Business logic
│   └── resources/
│       ├── application.properties
│       ├── application-dev.properties
│       ├── application-prod.properties
│       └── application-test.properties
```
