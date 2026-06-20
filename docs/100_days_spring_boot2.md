# 100 Days of Spring Boot

A day-by-day plan to learn Spring Boot by building one project end to end: **TaskFlow API** — projects, tasks, users, comments, attachments, notifications.

## How to use
- Code at least **60 minutes/day**.
- **Commit daily**; never skip two days in a row.
- Keep a short **daily log**.

## Stack
Java 21 · Spring Boot 4 · Maven · JUnit · Mockito · Testcontainers · Docker · PostgreSQL.

## Daily log template
```md
## Day N
- Time:
- Learned:
- Built:
- Blockers:
- Commit:
```

---
<div style="page-break-after: always"></div>

## Days 1–7: Foundations
| Day | Task | tracker |
|---:|---:|---|
| 1 | Install Java 21, IDE, Maven/Gradle; generate a Spring Boot project; run `/hello`. | [ ] |
| 2 | Create Git repo, `.gitignore`, README, conventional commits; push day-1 code. | [ ] |
| 3 | Learn HTTP basics: methods, status codes, headers; create a Postman/HTTPie collection. | [ ] |
| 4 | Java refresher: records, streams, `Optional`, exceptions; write plain Java domain tests. | [ ] |
| 5 | Practice JSON with Jackson: serialization, deserialization, naming, null inclusion. | [ ] |
| 6 | Master build tool: dependencies, plugins, lifecycle; add Spotless/Checkstyle. | [ ] |
| 7 | Bootstrap TaskFlow: packages, `banner.txt`, `CommandLineRunner` printing app name. | [ ] |

## Days 8–14: Spring Core
| Day | Task | tracker |
|---:|---:|---|
| 8 | Add `@Service`/`@Component` beans; use constructor injection only. | [ ] |
| 9 | Demo bean lifecycle with `@PostConstruct`/`@PreDestroy`; compare singleton/prototype. | [ ] |
| 10 | Create `@ConfigurationProperties` for TaskFlow settings. | [ ] |
| 11 | Add `dev`, `test`, `prod` profiles; externalize config via env vars. | [ ] |
| 12 | Configure SLF4J/Logback; add request correlation ID filter. | [ ] |
| 13 | Add Spring Boot Actuator, custom `HealthIndicator`, `/info` details. | [ ] |
| 14 | Introduce MapStruct for DTO mapping; configure compiler plugin. | [ ] |

## Days 15–21: REST API Basics
| Day | Task | tracker |
|---:|---:|---|
| 15 | Build in-memory `GET /api/v1/tasks`. | [ ] |
| 16 | Add `POST` returning `201 Created` + `Location` header. | [ ] |
| 17 | Add `GET /{id}`, `PUT`, `PATCH`, `DELETE` with correct status codes. | [ ] |
| 18 | Add request/response DTOs + Bean Validation. | [ ] |
| 19 | Add `@ControllerAdvice` with RFC 7807 `ProblemDetail` error responses. | [ ] |
| 20 | Add springdoc-openapi; annotate DTOs and endpoints. | [ ] |
| 21 | Add pagination, sorting, filtering to in-memory tasks. | [ ] |

## Days 22–31: Persistence with Spring Data JPA
| Day | Task | tracker |
|---:|---:|---|
| 22 | Add H2 + JPA; create `TaskEntity` and repository. | [ ] |
| 23 | Add Docker Compose Postgres; switch datasource by profile. | [ ] |
| 24 | Add `Project` entity with `@OneToMany` tasks; inspect fetch behavior. | [ ] |
| 25 | Move business logic to transactional service layer. | [ ] |
| 26 | Add DB constraints, unique keys, and `@Version` optimistic locking. | [ ] |
| 27 | Add derived queries, `@Query`, and Specifications for filters. | [ ] |
| 28 | Add Flyway migrations and seed data. | [ ] |
| 29 | Enable JPA auditing: created/updated timestamps and user. | [ ] |
| 30 | Write repository tests using Testcontainers Postgres. | [ ] |
| 31 | Replace in-memory API with DB-backed implementation. | [ ] |

## Days 32–38: API Hardening
| Day | Task | tracker |
|---:|---:|---|
| 32 | Add file upload/download for task attachments. | [ ] |
| 33 | Send email via Spring Mail + Mailpit/Mailhog. | [ ] |
| 34 | Add `@Scheduled` due-date reminders. | [ ] |
| 35 | Add caching with Caffeine for project lookups. | [ ] |
| 36 | Call external API using `WebClient` with timeouts. | [ ] |
| 37 | Add i18n `MessageSource` and improve problem details. | [ ] |
| 38 | Release TaskFlow v0.1: README, API docs, Postman collection. | [ ] |

## Days 39–46: Security
| Day | Task | tracker |
|---:|---:|---|
| 39 | Add Spring Security with in-memory users; permit Swagger. | [ ] |
| 40 | Add `User` entity, `UserDetailsService`, BCrypt passwords. | [ ] |
| 41 | Add roles and `@PreAuthorize` method security. | [ ] |
| 42 | Add JWT login endpoint and token validation filter. | [ ] |
| 43 | Run Keycloak in Docker; switch to OAuth2 resource server. | [ ] |
| 44 | Configure CORS/CSRF strategy for a future SPA. | [ ] |
| 45 | Test secured endpoints with `@WithMockUser` and MockMvc. | [ ] |
| 46 | Security review: secrets in env, password reset design, headers. | [ ] |

## Days 47–54: Testing Pyramid
| Day | Task | tracker |
|---:|---:|---|
| 47 | Unit test services with Mockito and AssertJ. | [ ] |
| 48 | Test controllers with `@WebMvcTest`. | [ ] |
| 49 | Test repositories with `@DataJpaTest` + Testcontainers. | [ ] |
| 50 | Test `WebClient` external calls using WireMock. | [ ] |
| 51 | Add REST Assured end-to-end tests. | [ ] | [ ] |
| 52 | Create test data builders/fixtures and parameterized tests. | [ ] |
| 53 | Add ArchUnit rules: controllers don't use repositories directly. | [ ] |
| 54 | Add GitHub Actions CI: build, test, cache, report. | [ ] |

## Days 55–62: Observability and Operations
| Day | Task | tracker |
|---:|---:|---|
| 55 | Write multi-stage Dockerfile; run as non-root. | [ ] |
| 56 | Create `docker-compose.yml`: app, Postgres, Mailpit, Keycloak. | [ ] |
| 57 | Expose Prometheus metrics; add custom Micrometer metric. | [ ] |
| 58 | Run Prometheus + Grafana; build request/latency dashboard. | [ ] |
| 59 | Add Micrometer tracing + Zipkin/Tempo. | [ ] |
| 60 | JSON logs + correlation ID; optionally add Loki. | [ ] |
| 61 | Write Kubernetes manifests or Helm chart; run on kind/minikube. | [ ] |
| 62 | Add semantic versioning, changelog, Git tag `v0.2`. | [ ] |

## Days 63–70: Events and Messaging
| Day | Task | tracker |
|---:|---:|---|
| 63 | Publish domain events with `ApplicationEventPublisher`. | [ ] |
| 64 | Add idempotency key for task creation. | [ ] |
| 65 | Implement transactional outbox table + scheduler publisher. | [ ] |
| 66 | Add RabbitMQ producer and consumer. | [ ] |
| 67 | Add Kafka alternative or separate Kafka module. | [ ] |
| 68 | Add retry, backoff, and DLQ handling. | [ ] |
| 69 | Version event contracts using JSON Schema/Avro. | [ ] |
| 70 | Build mini flow: task completed -> audit event + notification event. | [ ] |

## Days 71–78: Reactive Spring
| Day | Task | tracker |
|---:|---:|---|
| 71 | Create separate WebFlux module with hello endpoints. | [ ] |
| 72 | Add R2DBC or Reactive Mongo repository. | [ ] |
| 73 | Add SSE endpoint streaming task updates. | [ ] |
| 74 | Add WebSocket activity feed. | [ ] |
| 75 | Test reactive pipelines with `StepVerifier`. | [ ] |
| 76 | Add reactive security and reactive `WebClient`. | [ ] |
| 77 | Compare MVC vs WebFlux tradeoffs in notes. | [ ] |
| 78 | Expose one reactive endpoint from main app or keep module separate. | [ ] |

## Days 79–86: Microservices Basics
| Day | Task | tracker |
|---:|---:|---|
| 79 | Refactor to modular monolith; add Spring Modulith tests. | [ ] |
| 80 | Extract notification service; call it via OpenFeign. | [ ] |
| 81 | Add Eureka/Consul service discovery. | [ ] |
| 82 | Add Spring Cloud Gateway routes and rate limiting. | [ ] |
| 83 | Add Config Server or centralized config source. | [ ] |
| 84 | Add Resilience4j: circuit breaker, retry, bulkhead, time limiter. | [ ] |
| 85 | Propagate distributed tracing across services. | [ ] |
| 86 | Add Spring Cloud Contract between task and notification services. | [ ] |

## Days 87–94: Production Readiness
| Day | Task | tracker |
|---:|---:|---|
| 87 | Add DB indexes; run `EXPLAIN`; fix N+1 queries. | [ ] |
| 88 | Add Redis cache and Bucket4j rate limiting. | [ ] |
| 89 | Map Keycloak roles; document multi-tenant design if applicable. | [ ] |
| 90 | Add OWASP Dependency-Check and CycloneDX SBOM. | [ ] |
| 91 | Try GraalVM native image or CRaC/AppCDS experiment. | [ ] |
| 92 | Add Postgres backup/restore scripts and rollback plan. | [ ] |
| 93 | Run Gatling/JMeter load test; tune pools and JVM. | [ ] |
| 94 | Write ADRs, C4 diagram, runbook, API changelog. | [ ] |

## Days 95–100: Capstone and Release
| Day | Task | tracker |
|---:|---:|---|
| 95 | Freeze TaskFlow v1.0 scope; triage GitHub issues. | [ ] |
| 96 | Refactor packages, remove dead code, improve tests. | [ ] |
| 97 | Deploy to Render/Fly.io/Railway/AWS/GCP/Azure with managed DB. | [ ] |
| 98 | Add demo data, screenshots, short video/GIF, public URL. | [ ] |
| 99 | Do self/peer code review; simulate incident using logs/traces. | [ ] |
| 100 | Write retrospective + blog post; tag `v1.0`; plan next 30 days. | [ ] |

---

## Progress tracker
- [ ] Days 1–7 Foundations
- [ ] Days 8–14 Spring Core
- [ ] Days 15–21 REST API Basics
- [ ] Days 22–31 Persistence
- [ ] Days 32–38 API Hardening
- [ ] Days 39–46 Security
- [ ] Days 47–54 Testing
- [ ] Days 55–62 Observability
- [ ] Days 63–70 Events/Messaging
- [ ] Days 71–78 Reactive
- [ ] Days 79–86 Microservices
- [ ] Days 87–94 Production Readiness
- [ ] Days 95–100 Capstone