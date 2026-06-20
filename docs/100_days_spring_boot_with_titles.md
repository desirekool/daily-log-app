# 100 Days Spring Boot Plan

### Week 1: REST API Basics

| Day | Task | Tracker |
|-----|------|--------|
| Day | Topic: Core Task (Stretch: Stretch Goal) | [ ] |
| ----- | -------: ----------- (Stretch: --------------) | [ ] |
| 1 | Setup and Hello World: Install JDK 17+, generate project via spring.io, write `@RestController` (Stretch: Run as systemd service/Docker) | [ ] |
| 2 | `@SpringBootApplication`: Explore auto-configuration report, add custom `@Bean` (Stretch: Conditional bean with `@Profile`) | [ ] |
| 3 | Request Mapping: Build `UserController` with `GET /users/{id}` (Stretch: Class-level `@RequestMapping`) | [ ] |
| 4 | Validation: `GET /users?email=...` with `@RequestParam` and `@Email` (Stretch: Custom validation annotation) | [ ] |
| 5 | Request Body: `UserRequestDTO` with `POST /users` (Stretch: JSON include/ignore controls) | [ ] |
| 6 | Response Entity: Return `ResponseEntity` with proper HTTP status (Stretch: Set custom headers) | [ ] |
| 7 | **Project: User API v1**: Combine Days 3-6, handle 404 (Stretch: Implement `PUT /users/{id}`) | [ ] |

### Week 2: Advanced Web & Documentation

| Day | Task | Tracker |
|-----|------|--------|
| Day | Topic: Core Task (Stretch: Stretch Goal) | [ ] |
| ----- | -------: ----------- (Stretch: --------------) | [ ] |
| 8 | `@ControllerAdvice`: Global exception handler for validation errors (Stretch: Handle custom `EntityNotFoundException`) | [ ] |
| 9 | Logging: SLF4J with `LoggerFactory` at different levels (Stretch: Configure logging patterns) | [ ] |
| 10 | Testing with MockMvc: Test `UserController` with `@WebMvcTest` (Stretch: Use `@JsonTest`) | [ ] |
| 11 | Spring MVC Internals: Draw request flow: `DispatcherServlet` → Controller (Stretch: Explore `HandlerInterceptor`) | [ ] |
| 12 | Content Negotiation: Support JSON/XML responses (Stretch: Use `Accept` header switching) | [ ] |
| 13 | File Upload: `POST /users/{id}/avatar` with `MultipartFile` (Stretch: Configurable storage directory) | [ ] |
| 14 | Internationalization: `messages.properties` + `MessageSource` (Stretch: Locale from `Accept-Language`) | [ ] |
| 15 | Actuator: Add `spring-boot-starter-actuator` (Stretch: Secure endpoints) | [ ] |
| 16 | **Project: Week 2 Complete**: Add file upload, i18n, custom actuator (Stretch: Peer review with Postman) | [ ] |
| 17 | REST Principles: Document HATEOAS compliance (Stretch: Add HATEOAS links) | [ ] |
| 18 | API Versioning: URL path versioning (`/api/v1/`) (Stretch: Compare header/parameter versioning) | [ ] |
| 19 | Swagger/OpenAPI: Add `springdoc-openapi` (Stretch: Group by tags) | [ ] |
| 20 | **Week 2 Review**: Generate API docs, write README (Stretch: **Deliverable**: Complete User Service API v1) | [ ] |

### Week 3: JPA Fundamentals

| Day | Task | Tracker |
|-----|------|--------|
| Day | Topic: Core Task (Stretch: Stretch Goal) | [ ] |
| ----- | -------: ----------- (Stretch: --------------) | [ ] |
| 21 | JPA and Hibernate: Add `spring-boot-starter-data-jpa`, H2 DB, `UserRepository` (Stretch: Examine generated DDL) | [ ] |
| 22 | Entity Relationships: `@OneToMany` (User→Orders), `@ManyToOne` (Stretch: `@ManyToMany` (User↔Role)) | [ ] |
| 23 | CRUD Repository: Use built-in methods: `save()`, `findById()` (Stretch: Custom `@Query` for `findByEmail`) | [ ] |
| 24 | DB Initialization: `schema.sql` + `data.sql` (Stretch: `import.sql` for Hibernate) | [ ] |
| 25 | **Project: Persist Users**: Wire `UserRepository` into service (Stretch: Add Flyway/Liquibase) | [ ] |
| 26 | Entity Lifecycle: Log state transitions (Stretch: Demonstrate N+1 problem) | [ ] |
| 27 | Fetching Strategies: Fix N+1 with `@EntityGraph`/`JOIN FETCH` (Stretch: Use `@BatchSize`) | [ ] |
| 28 | Projections: Interface & DTO projections (Stretch: Constructor expression in `@Query`) | [ ] |
| 29 | Pagination and Sorting: `GET /users?page=0&size=10&sort=name` (Stretch: Global sort config) | [ ] |
| 30 | Auditing: `@CreatedDate`, `@LastModifiedDate` (Stretch: `@EnableJpaAuditing`) | [ ] |

### Week 4: Advanced JPA & Transactions

| Day | Task | Tracker |
|-----|------|--------|
| Day | Topic: Core Task (Stretch: Stretch Goal) | [ ] |
| ----- | -------: ----------- (Stretch: --------------) | [ ] |
| 31 | Testing JPA: `@DataJpaTest` with `@Sql` (Stretch: Test transaction rollback) | [ ] |
| 32 | Transactions: `@Transactional`, demonstrate rollback (Stretch: Propagation (`REQUIRES_NEW`)) | [ ] |
| 33 | **Project: Order and Product**: Create entities with relationships (Stretch: `@Enumerated` for enums) | [ ] |
| 34 | Database Types: Switch H2 → PostgreSQL (Docker) (Stretch: Testcontainers for tests) | [ ] |
| 35 | Connection Pooling: Configure HikariCP properties (Stretch: Monitor via Actuator) | [ ] |
| 36 | **Project: Order Logic**: `createOrder()`, `getOrder()` (Stretch: Optimistic locking with `@Version`) | [ ] |
| 37 | Caching: `@Cacheable` on product queries (Stretch: Configure Caffeine/Redis) | [ ] |
| 38 | NoSQL (MongoDB): Add `spring-boot-starter-data-mongodb` (Stretch: Compare with JPA) | [ ] |
| 39 | **Project: Caching and NoSQL**: Cache catalog, store logs in MongoDB (Stretch: Cache eviction on update) | [ ] |
| 40 | **Phase 2 Review**: Clean entities, fix N+1, ensure tests pass (Stretch: Code review of entity designs) | [ ] |

### Week 6: Security

| Day | Task | Tracker |
|-----|------|--------|
| Day | Topic: Core Task (Stretch: Stretch Goal) | [ ] |
| ----- | -------: ----------- (Stretch: --------------) | [ ] |
| 41 | Security Fundamentals: Add `spring-boot-starter-security`, in-memory auth (Stretch: Explore filter chain) | [ ] |
| 42 | JWT Authentication: Integrate `jjwt`, create filter & config (Stretch: Token refresh endpoint) | [ ] |
| 43 | Password Encoding: `BCryptPasswordEncoder` (Stretch: Test password matches) | [ ] |
| 44 | Method Security: `@PreAuthorize("hasRole('ADMIN')")` (Stretch: `@PostAuthorize` filtering) | [ ] |
| 45 | **Project: Secure APIs**: Protect endpoints with JWT (Stretch: Role-based access (USER/ADMIN)) | [ ] |
| 46 | OAuth2 Resource Server: Configure with Google/GitHub (Stretch: `@RegisteredOAuth2AuthorizedClient`) | [ ] |

### Week 7: Async & Messaging

| Day | Task | Tracker |
|-----|------|--------|
| Day | Topic: Core Task (Stretch: Stretch Goal) | [ ] |
| ----- | -------: ----------- (Stretch: --------------) | [ ] |
| 47 | `@Async`: `@EnableAsync`, async email sending (Stretch: Configure `TaskExecutor`) | [ ] |
| 48 | `@Scheduled`: Daily sales report with cron (Stretch: ShedLock for distributed) | [ ] |
| 49 | Email Sending: `spring-boot-starter-mail` with Mailtrap (Stretch: Thymeleaf template) | [ ] |
| 50 | **Project: Async Notifications**: Decouple order creation (Stretch: Track `Notification` entity) | [ ] |
| 51 | WebFlux Intro: Reactive controller with `Mono`/`Flux` (Stretch: Compare with MVC) | [ ] |
| 52 | REST Clients: `WebClient` vs `RestTemplate` (Stretch: Add Resilience4j) | [ ] |
| 53 | **Project: Reactive Search**: Aggregate DB + external API (Stretch: Cache reactive pipeline) | [ ] |
| 54 | API Gateway: Spring Cloud Gateway routes (Stretch: Global filter for logging) | [ ] |
| 55 | Service Discovery: Eureka client registration (Stretch: Run Eureka in Docker) | [ ] |
| 56 | Distributed Tracing: Sleuth + Zipkin (Stretch: Analyze traces) | [ ] |
| 57 | Circuit Breaker: Resilience4j `@CircuitBreaker` (Stretch: Combine with `@Retry`) | [ ] |
| 58 | **Project: Microservices**: Decompose monolith, Feign calls (Stretch: API Composition pattern) | [ ] |
| 59 | Configuration Mgmt: Externalize configs, profiles (Stretch: Spring Cloud Config Server) | [ ] |
| 60 | Secrets Mgmt: Env vars/HashiCorp Vault (Stretch: AWS/Azure Secrets Manager) | [ ] |

### Week 9: Containerization & Observability

| Day | Task | Tracker |
|-----|------|--------|
| Day | Topic: Core Task (Stretch: Stretch Goal) | [ ] |
| ----- | -------: ----------- (Stretch: --------------) | [ ] |
| 61 | **Project: Production Config**: Split by profile, env vars for secrets (Stretch: Encrypted config with Jasypt) | [ ] |
| 62 | Dockerizing: `Dockerfile` with multi-stage build (Stretch: Optimize layers) | [ ] |
| 63 | Docker Compose: `docker-compose.yml` for all services (Stretch: Health checks) | [ ] |
| 64 | Kubernetes: Generate K8s manifests (Stretch: `ConfigMap` & `Secret`) | [ ] |
| 65 | CI/CD (GitHub Actions): Build → Test → Docker → Push (Stretch: Add SonarQube) | [ ] |
| 66 | ELK Stack: JSON logs → Logstash → Kibana (Stretch: MDC for `traceId`) | [ ] |
| 67 | Prometheus and Grafana: Micrometer → Prometheus → Grafana (Stretch: Set up alerts) | [ ] |
| 68 | **Project: Full Ops Pipeline**: Dockerize all, K8s manifests, CI (Stretch: Deploy to free K8s cluster) | [ ] |
| 69 | Performance Tuning: Analyze heap dump, GC tuning (Stretch: Profile with VisualVM) | [ ] |
| 70 | **Phase 3 Review**: Integration tests with Testcontainers (Stretch: Test full order flow) | [ ] |

### Week 12: Testing Excellence

| Day | Task | Tracker |
|-----|------|--------|
| Day | Topic: Core Task (Stretch: Stretch Goal) | [ ] |
| ----- | -------: ----------- (Stretch: --------------) | [ ] |
| 71 | Testcontainers: Replace H2 with real PostgreSQL (Stretch: Test Redis/MongoDB) | [ ] |
| 72 | Mockito Deep Dive: `argumentCaptor`, `doThrow()`, static mocks (Stretch: `@InjectMocks` vs constructor) | [ ] |
| 73 | **Project: Test Suite**: >80% coverage, contract tests (Pact) (Stretch: JaCoCo in CI) | [ ] |
| 74 | AOP: `@Around` aspect for logging (Stretch: Custom `@LogExecutionTime`) | [ ] |
| 75 | Spring Events: `OrderPlacedEvent` with `@EventListener` (Stretch: Async event listener) | [ ] |

### Week 13: Messaging & Batch

| Day | Task | Tracker |
|-----|------|--------|
| Day | Topic: Core Task (Stretch: Stretch Goal) | [ ] |
| ----- | -------: ----------- (Stretch: --------------) | [ ] |
| 76 | RabbitMQ/Kafka: Send events to RabbitMQ (Stretch: Switch to Kafka) | [ ] |
| 77 | **Project: Event-Driven**: Decouple via message broker (Stretch: Dead-letter queue) | [ ] |
| 78 | GraphQL: `spring-boot-starter-graphql` (Stretch: Compare with REST) | [ ] |
| 79 | Spring Batch: Daily sales report job (Stretch: Job metadata in DB) | [ ] |
| 80 | **Project: GraphQL and Batch**: GraphQL API + scheduled batch (Stretch: Auto-launch batch job) | [ ] |

### Week 14: Real-Time & Observability

| Day | Task | Tracker |
|-----|------|--------|
| Day | Topic: Core Task (Stretch: Stretch Goal) | [ ] |
| ----- | -------: ----------- (Stretch: --------------) | [ ] |
| 81 | WebSockets and STOMP: Live order tracking dashboard (Stretch: `@SendToUser`) | [ ] |
| 82 | Server-Sent Events: `GET /orders/{id}/stream` (Stretch: Reactive `Flux`) | [ ] |
| 83 | **Project: Real-Time**: WebSocket/SSE updates (Stretch: Simple HTML/JS client) | [ ] |
| 84 | Custom Actuator: `/actuator/orders/pending-count` (Stretch: `HealthIndicator`) | [ ] |
| 85 | Custom Metrics: `Counter`, `Gauge`, `Timer` (Stretch: Push to Prometheus) | [ ] |
| 86 | **Project: Advanced Observability**: Custom health + metrics + Grafana (Stretch: Prometheus alerts) | [ ] |
| 87 | Legacy XML Config: `applicationContext.xml` (Stretch: When/why it's deprecated) | [ ] |
| 88 | Custom Starter: Create your own starter (Stretch: Publish to private repo) | [ ] |
| 89 | DevTools and LiveReload: Hot swapping, auto-restart (Stretch: Remote debugging) | [ ] |
| 90 | **Project: Refactor and Optimize**: Code review, fix N+1, add logging (Stretch: JMeter load test) | [ ] |

### Week 18: Final Polish & Deployment

| Day | Task | Tracker |
|-----|------|--------|
| Day | Topic: Core Task (Stretch: Stretch Goal) | [ ] |
| ----- | -------: ----------- (Stretch: --------------) | [ ] |
| 91 | Migration (Boot 2→3): Check `properties-migrator` (Stretch: Jakarta EE changes) | [ ] |
| 92 | Spring Native: Build GraalVM native image (Stretch: Limitations & config) | [ ] |
| 93 | **Project: Final Polish**: Complete README, architecture diagram (Stretch: 5-min demo video) | [ ] |
| 94 | Static Analysis: SpotBugs, Checkstyle, PMD (Stretch: Enforce rules) | [ ] |
| 95 | Security Hardening: OWASP Dependency-Check, security headers (Stretch: Basic penetration test) | [ ] |
| 96 | Performance Testing: JMeter test plan (100 users) (Stretch: Tune based on results) | [ ] |
| 97 | Backup and Recovery: PostgreSQL backup scripts (Stretch: Point-in-time recovery) | [ ] |
| 98 | Documentation: ADRs, OpenAPI spec, runbook (Stretch: Generate OpenAPI from code) | [ ] |
| 99 | Consolidation: Create personal cheatsheet (Stretch: Teach a core concept) | [ ] |
| 100 | **CELEBRATE and PLAN**: Deploy publicly, update LinkedIn (Stretch: Choose specialization path) | [ ] |

