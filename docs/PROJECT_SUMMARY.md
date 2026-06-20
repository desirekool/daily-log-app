# Daily Log App — Project Summary

## Overview
A full-stack daily log tracking application for structured learning plans (e.g., "100 Days of Spring Boot"). Users can create plans with custom sections and columns, log daily entries, and view/edit plans via an interactive markdown editor.

---

## Architecture

```
daily-log-app/
├── backend/                          # Spring Boot 3 + Java 17
│   └── dailylogapp/
│       └── src/main/java/com/dailylog/dailylogapp/
│           ├── controller/           # REST controllers (Auth, Plan, DailyLog, etc.)
│           ├── model/                # JPA entities (Plan, Section, PlanColumn, DailyLog, LogEntry, User)
│           ├── repository/           # Spring Data JPA repos
│           ├── service/              # Business logic
│           └── dto/                  # Request/response DTOs
├── frontend/                         # React 19 + CRA + TypeScript
│   └── src/
│       ├── pages/                    # LoginPage, RegisterPage, DashboardPage, PlansPage
│       ├── components/               # UI components
│       │   ├── layout/               # AppLayout sidebar+header
│       │   ├── logs/                 # LogModal, TrackerCell, RowTooltip
│       │   ├── plans/                # PlanModal, PlanMarkdownView
│       │   └── ui/                   # shadcn/ui components (12 files)
│       ├── context/                  # ThemeContext (3 themes)
│       ├── services/                 # API service functions
│       └── types/                    # TypeScript interfaces
```

---

## What We Built

### Backend (Spring Boot 3)
- **Auth system**: Login/register with `HttpSession`, cookie-based auth (`SameSite=None;Secure`)
- **Plan CRUD**: Create/read/update plans with nested sections and columns
- **Daily Log CRUD**: Create/update/delete daily logs with entries per column
- **Section Progress endpoint**: Returns completed/total count per section
- **Entities**: `User`, `Plan`, `Section` (with section type), `PlanColumn` (with column type, tracker flag, position), `DailyLog`, `LogEntry`
- **Infinite recursion fix**: `@JsonManagedReference`/`@JsonBackReference` + convenience getters (`getPlanId`, `getUserId`, `getSectionId`, `getPlanColumnId`, `getDailyLogId`)
- **Archived plans**: `archived` boolean field on Plan, API filters `archived=false`
- **Database**: H2 in-memory (`jdbc:h2:mem:daily_log_db`) with seed data on startup

### Frontend (React 19 + CRA + TypeScript)
- **Login/Register pages**: Form validation, cookie-based auth, redirect to dashboard
- **Dashboard page**: Sidebar with list of plans, click to select
- **Plans page**: View plan with expandable sections, collapsible tables per section, editable markdown
- **Markdown editor**: `MDXEditor` for editing plans in markdown table format
- **View/Edit tabs**: `shadcn Tabs` with View (read-only table with tracker checkboxes) and Edit (markdown editor)
- **Save functionality**: Parses markdown table back to entries, skips `[x]` (already completed) rows
- **Export functionality**: Copies markdown to clipboard
- **shadcn UI components**: 12 components (Button, Input, Textarea, Label, Checkbox, Progress, Card, Table, Tabs, Dialog, Select, Tooltip)
- **3 runtime themes**: Ocean (blue), Emerald (green), Sunset (amber) via CSS variables + `ThemeContext` persisted to localStorage
- **Theme switcher**: Three color-dot buttons in the header bar

### Fixed Issues
- JSON infinite recursion (StackOverflowError) — entity annotations
- H2 in-memory database wipe on restart — restart backend to regenerate seed data
- Backend PID tracking — runs on port 8080
- CRA proxy (port 3000 → 8080) — login and plans API work through both ports

---

## How to Run

### Terminal 1 — Backend
```bash
cd backend/dailylogapp
mvnw spring-boot:run -DskipTests
# Runs on http://localhost:8080
```

### Terminal 2 — Frontend
```bash
cd frontend
npm start
# Runs on http://localhost:3000, proxies API calls to 8080
```

### Test Credentials (from seed data)
- Username: `ahmed` / Password: `password123`
- Username: `john` / Password: `password123`

### Test API Directly
```powershell
curl.exe -c cookies.txt -b cookies.txt http://localhost:8080/api/plans
```

---

## Key Technical Decisions

| Decision | Rationale |
|----------|-----------|
| **3-theme CSS variables** (not dark mode toggle) | Each theme overrides `--primary`/`--ring`; neutrals stay shared, switched via `<html class="theme-xxx">` |
| **shadcn created manually** (not `npx shadcn init`) | CRA lacks `@/` path alias; manual creation avoids `craco`/`react-app-rewired` |
| **OrphanRemoval=true** on `Plan.sections` and `Plan.columns` | `updatePlan()` can clear and re-add without stale entities |
| **Skip `[x]` rows on Save** | Already-completed tracker entries are not updated in Edit→Save |
| **Cookie-based sessions** (SameSite=None;Secure) | Standard servlet container session management |

---

## Planned Next Steps

1. **Deployment ready**:
   - Dockerfile for backend + frontend (blocked: Docker daemon unavailable)
   - PostgreSQL or file-based H2 for persistent data
   - HTTPS setup for cookie-based auth in production

2. **UI polish**:
   - Delete plan functionality
   - User settings page (reset password, theme preference)
   - Loading states and error boundaries
   - Toast notifications for save/export feedback

3. **Feature additions**:
   - Archived plans management (unarchive/delete archived plans)
   - Plan templates (pre-built 30/60/100 day plans)
   - Export to PDF/CSV
   - Drag-and-drop reordering of sections/columns
   - Real-time collaboration (WebSocket)

4. **Testing**:
   - Backend unit tests (JUnit + Mockito)
   - Frontend component tests (React Testing Library)
   - Integration tests

5. **Infrastructure**:
   - CI/CD pipeline
   - Environment-specific configuration
   - Logging and monitoring

---

## Notes
- H2 database is in-memory — **all data is lost on backend restart**
- Use `curl.exe` (not `Invoke-WebRequest`/Postman) to test API on Windows because `Secure` cookies are not sent over HTTP
- Docker is unavailable on this machine — Docker-based deployment cannot be verified
