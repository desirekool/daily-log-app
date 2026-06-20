# Daily Log App

A full-stack application for tracking daily progress across multiple plans with a 4-phase lifecycle (Setup → Hydrate → Execute → Review).

## About

This is a proof of concept implementation of a client-server application. I had the following choices when choosing the architecture:

1. PHP using Laravel (to learn Laravel) — decided against as I need more time and am currently refreshing my Spring Boot skills. Laravel would be a distraction for now.
2. Next.js — as much as I like Next.js, the implementation would have taught me nothing new.
3. Using a JS frontend with a backend implemented in:
   1. Express / Nest.js
   2. Go
   3. Spring Boot

I decided to use React and Spring Boot based on my current learning plans. And yes, the project is the result of managing printed plan sheets and losing them.

### Project Goals

1. implement a backend to handle a to-do list
2. implement a REST API and communicate with it using basic authentication (security was not a focus)
3. implement a frontend to communicate with the API
4. CRUD operations
5. read and write Markdown files

### Project Review

The project turned out better than expected. Points 1–4 exceeded my expectations. Excluding security was a good decision — it allowed me to concentrate on other important issues.

But as always, there are some issues. The choice of Markdown as a medium was not a good idea. Markdown is a good medium for, say, blogs where we want to convert user text into HTML and display it. It also has some very good table handling, which led to using it in the first place.

It didn't help that I decided to use the MDXEditor package. It is an excellent editor when entering activities, but I could not find a way to use it as a viewer, so I ended up removing it from most views. This made clear during implementation that Markdown was more of a technical debt than an asset. In the end I had to write a lot of code to cover edge cases.

## Architecture

```
daily-log-app/
├── backend/           # Spring Boot 4.0 + Java 21
│   ├── src/
│   └── Dockerfile
├── frontend/          # React 19 + Vite + TypeScript 6 + Tailwind 4 + MDXEditor
│   ├── src/
│   └── Dockerfile
├── docker-compose.yml # PostgreSQL + Redis + backend + frontend
└── README.md
```

**Backend**: Spring Boot 4.0.6, JPA/Hibernate 7, Spring Security 7, Jackson 3, Lombok, H2 (dev) / PostgreSQL (prod/test)

**Frontend**: React 19, Vite 8, TypeScript 6, Tailwind CSS 4, Radix UI / shadcn/ui, Lucide icons, MDXEditor

## Quick Start (Development)

### Prerequisites
- Java 21+
- Node.js 20+
- Maven
- Docker Desktop (for prod/test profiles)

### Run locally (dev profile — H2 in-memory)

**Terminal 1 — Backend:**
```bash
cd backend
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm install
npm start
```

The app is available at `http://localhost:3000`. Backend API is proxied from port 3000 to 8080 by Vite.

### Default login
- Username: `user`
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

- **Backend**: Spring Boot 4.0.6, Spring Data JPA / Hibernate 7, Spring Security 7, Jackson 3, H2, PostgreSQL, Redis, Lombok
- **Frontend**: React 19, TypeScript 6, Vite 8, Tailwind CSS 4, Radix UI / shadcn/ui, Lucide React, MDXEditor, Sentry
- **Infrastructure**: Docker, Docker Compose, Nginx

## Testing

### Backend
```bash
cd backend
mvn test
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
