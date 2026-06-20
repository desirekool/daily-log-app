# Daily Log App — Implementation Plan

## Overview
Full-stack app: React + Spring Boot + PostgreSQL + Redis (sessions)
Track daily progress across multiple plans with user-defined columns.

## Architecture

```
React SPA (port 3000) → Nginx (reverse proxy) → Spring Boot (port 8080)
                                                    ├── PostgreSQL (data)
                                                    └── Redis (sessions)
```

## Data Model

```
User (1) ──── (N) Plan
                     │
                     ├── (N) Section { name, position }
                     │            └── (N) DailyLog { dayNumber, date }
                     │                            └── (N) LogEntry { value }
                     │
                     └── (N) PlanColumn { name, description, type, position, isTracker }
                                          └── referenced by LogEntry.planColumnId
```

## Seed Data
- User: `ahmed` / `password`
- Plan 1: "100 Days Spring Boot (Detailed)" — from `100_days_spring_boot_with_titles.md`
- Plan 2: "100 Days Spring Boot (TaskFlow)" — from `100_days_spring_boot2.md`
- Plan 3: "Daily Journal" — with Time/Learned/Built/Blockers/Commit columns

## UI Layout

```
┌───────────────────────────────────────────────────────────┐
│ Top bar:  Daily Log App  │  Welcome ahmed [Logout]       │
├──────────────┬────────────────────────────────────────────┤
│ SIDEBAR 250px │  MAIN CONTENT                            │
│               │                                          │
│ ☰ Plans       │  Plan view (sections collapsible):       │
│ ──────────    │    ┌──────┬──────────────────┬──────────┐│
│ ● 100 Days    │    │ Day  │ Task             │ Tracker  ││
│   Spring(62%) │    ├──────┼──────────────────┼──────────┤│
│ ● 100 Days    │    │ 1    │ Setup & Hello... │ [✓]←hover││
│   TaskFlow    │    │ 2    │ @SpringBootApp.. │ [ ]←click││
│ ○ Daily       │    └──────┴──────────────────┴──────────┘│
│   Journal      │    [##========] 2/7 complete             │
│               │                                          │
│ [+ New Plan]  │  Click [ ] → LogModal (dynamic form)     │
└──────────────┴────────────────────────────────────────────┘
```

## Interaction Flow

```
Login → Dashboard → Click plan in sidebar
  ↓
Plan view → Sections (collapsible with progress bars)
  ↓ hover row → Smart preview popup (first 2-3 non-empty values)
  ↓ click [ ] checkbox → Create DailyLog + open LogModal
  ↓ fill form → Save → Tracker=[x] → Progress recalculated
```

## Key Components

### Backend
| Layer | Files |
|-------|-------|
| Models | User, Plan, PlanColumn, Section, DailyLog, LogEntry |
| Repos | UserRepository, PlanRepository, PlanColumnRepository, SectionRepository, DailyLogRepository, LogEntryRepository |
| Services | AuthService, PlanService, SectionService, DailyLogService, LogEntryService |
| Controllers | AuthController, PlanController, SectionController, DailyLogController, PlanColumnController |
| DTOs | AuthRequest, RegisterRequest, AuthResponse, PlanRequest, SectionRequest, DailyLogRequest, PlanColumnRequest |
| Config | SecurityConfig (CORS, session auth), DataSeeder |

### Frontend
| Layer | Files |
|-------|-------|
| API | api.ts, authService.ts, planService.ts, logService.ts |
| Components | AppLayout, PlanModal, LogModal, RowTooltip, TrackerCell |
| Pages | DashboardPage, PlansPage (plan detail view), LoginPage, RegisterPage |
| Context | AuthContext |

## Phases

### Phase 1: Infrastructure
1. Rename backend2 → backend
2. Create backend/Dockerfile (multi-stage Maven build)
3. Fix pom.xml (SB 4.1.0 → 3.3.1)

### Phase 2: Backend Refactor & API
1. Add Section model, refactor DailyLog, extend PlanColumn
2. All repositories, services, controllers, DTOs
3. Fix SecurityConfig (CORS, session auth)
4. DataSeeder

### Phase 3: Frontend
1. API layer (api.ts, planService.ts, logService.ts)
2. AppLayout with sidebar
3. PlanModal, LogModal, RowTooltip, TrackerCell
4. Rewrite PlansPage (plan detail view)
5. Update Dashboard, AuthContext, App.tsx

### Phase 4: Verify
1. docker-compose up --build
2. Test: register → login → plan with sections → log entries → hover → checkbox
