package com.dailylog.dailylogapp.config;

import com.dailylog.dailylogapp.model.*;
import com.dailylog.dailylogapp.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder {

    private final UserRepository userRepository;
    private final PlanRepository planRepository;
    private final SectionRepository sectionRepository;
    private final PlanColumnRepository planColumnRepository;
    private final DailyLogRepository dailyLogRepository;
    private final LogEntryRepository logEntryRepository;
    private final PasswordEncoder passwordEncoder;

    @EventListener(ApplicationReadyEvent.class)
    @Transactional
    public void seed() {
        if (userRepository.count() > 0) {
            log.info("Seed data already exists, skipping");
            return;
        }

        log.info("Seeding initial data...");

        User ahmed = User.builder()
            .username("ahmed")
            .password(passwordEncoder.encode("password"))
            .email("ahmed@example.com")
            .build();
        ahmed = userRepository.save(ahmed);

        seedPlan1(ahmed);

        log.info("Seed data created successfully");
    }

    private void seedPlan1(User user) {
        Plan plan = Plan.builder()
            .name("100 Days Spring Boot (Detailed)")
            .description("A comprehensive 100-day plan with weekly topics and stretch goals")
            .user(user)
            .build();
        plan = planRepository.save(plan);

        PlanColumn colDay = saveColumn(plan, "Day", "Day number", "text", false, 0);
        PlanColumn colTask = saveColumn(plan, "Task", "Description of the task", "text", false, 1);
        PlanColumn colTracker = saveColumn(plan, "Tracker", "Completion status", "checkbox", true, 2);

        List<String> sections = List.of(
            "Week 1: REST API Basics",
            "Week 2: Advanced Web & Documentation",
            "Week 3: JPA Fundamentals",
            "Week 4: Advanced JPA & Transactions",
            "Week 6: Security",
            "Week 7: Async & Messaging",
            "Week 9: Containerization & Observability",
            "Week 12: Testing Excellence",
            "Week 13: Messaging & Batch",
            "Week 14: Real-Time & Observability",
            "Week 18: Final Polish & Deployment"
        );

        int dayNum = 1;
        for (int s = 0; s < sections.size(); s++) {
            Section section = Section.builder()
                .name(sections.get(s))
                .position(s)
                .plan(plan)
                .build();
            section = sectionRepository.save(section);

            int daysInSection = s == 0 ? 7 : s == 1 ? 13 : s == 2 ? 10 : s == 3 ? 10 : s == 4 ? 6 :
                s == 5 ? 14 : s == 6 ? 10 : s == 7 ? 5 : s == 8 ? 5 : s == 9 ? 10 : 10;

            for (int d = 0; d < daysInSection && dayNum <= 100; d++, dayNum++) {
                String task = String.format("Day %d: Task for %s - day %d", dayNum, sections.get(s), d + 1);
                if (dayNum <= existingDayTasks1().length) {
                    task = existingDayTasks1()[dayNum - 1];
                }

                DailyLog log = DailyLog.builder()
                    .date(LocalDate.now().minusDays(100 - dayNum))
                    .dayNumber(dayNum)
                    .user(user)
                    .plan(plan)
                    .section(section)
                    .build();
                log = dailyLogRepository.save(log);

                saveEntry(log, colDay, String.valueOf(dayNum));
                saveEntry(log, colTask, task);
                saveEntry(log, colTracker, "[ ]");
            }
        }
    }
    private PlanColumn saveColumn(Plan plan, String name, String description, String type, boolean isTracker, int position) {
        PlanColumn col = PlanColumn.builder()
            .name(name).description(description).type(type)
            .isTracker(isTracker).position(position).plan(plan)
            .build();
        return planColumnRepository.save(col);
    }

    private void saveEntry(DailyLog log, PlanColumn column, String value) {
        LogEntry entry = LogEntry.builder()
            .entryValue(value).dailyLog(log).planColumn(column)
            .build();
        logEntryRepository.save(entry);
    }

    private String[] existingDayTasks1() {
        String[][] weeks = {
            {"Setup and Hello World: Install JDK 17+, generate project via spring.io, write @RestController (Stretch: Run as systemd service/Docker)"},
            {"@SpringBootApplication: Explore auto-configuration report, add custom @Bean (Stretch: Conditional bean with @Profile)"},
            {"Request Mapping: Build UserController with GET /users/{id} (Stretch: Class-level @RequestMapping)"},
            {"Validation: GET /users?email=... with @RequestParam and @Email (Stretch: Custom validation annotation)"},
            {"Request Body: UserRequestDTO with POST /users (Stretch: JSON include/ignore controls)"},
            {"Response Entity: Return ResponseEntity with proper HTTP status (Stretch: Set custom headers)"},
            {"Project: User API v1: Combine Days 3-6, handle 404 (Stretch: Implement PUT /users/{id})"}
        };
        return flattenTasks1();
    }

    private String[] flattenTasks1() {
        List<String> all = new ArrayList<>();
        String[][] data = {
            {"Setup and Hello World: Install JDK 17+, generate project via spring.io, write @RestController"},
            {"@SpringBootApplication: Explore auto-configuration report, add custom @Bean"},
            {"Request Mapping: Build UserController with GET /users/{id}"},
            {"Validation: GET /users?email=... with @RequestParam and @Email"},
            {"Request Body: UserRequestDTO with POST /users"},
            {"Response Entity: Return ResponseEntity with proper HTTP status"},
            {"Project: User API v1: Combine Days 3-6, handle 404"},
            {"@ControllerAdvice: Global exception handler for validation errors"},
            {"Logging: SLF4J with LoggerFactory at different levels"},
            {"Testing with MockMvc: Test UserController with @WebMvcTest"},
            {"Spring MVC Internals: Draw request flow: DispatcherServlet -> Controller"},
            {"Content Negotiation: Support JSON/XML responses"},
            {"File Upload: POST /users/{id}/avatar with MultipartFile"},
            {"Internationalization: messages.properties + MessageSource"},
            {"Actuator: Add spring-boot-starter-actuator"},
            {"Project: Week 2 Complete: Add file upload, i18n, custom actuator"},
            {"REST Principles: Document HATEOAS compliance"},
            {"API Versioning: URL path versioning (/api/v1/)"},
            {"Swagger/OpenAPI: Add springdoc-openapi"},
            {"Week 2 Review: Generate API docs, write README"},
            {"JPA and Hibernate: Add spring-boot-starter-data-jpa, H2 DB, UserRepository"},
            {"Entity Relationships: @OneToMany (User->Orders), @ManyToOne"},
            {"CRUD Repository: Use built-in methods: save(), findById()"},
            {"DB Initialization: schema.sql + data.sql"},
            {"Project: Persist Users: Wire UserRepository into service"},
            {"Entity Lifecycle: Log state transitions"},
            {"Fetching Strategies: Fix N+1 with @EntityGraph/JOIN FETCH"},
            {"Projections: Interface & DTO projections"},
            {"Pagination and Sorting: GET /users?page=0&size=10&sort=name"},
            {"Auditing: @CreatedDate, @LastModifiedDate"},
            {"Testing JPA: @DataJpaTest with @Sql"},
            {"Transactions: @Transactional, demonstrate rollback"},
            {"Project: Order and Product: Create entities with relationships"},
            {"Database Types: Switch H2 -> PostgreSQL (Docker)"},
            {"Connection Pooling: Configure HikariCP properties"},
            {"Project: Order Logic: createOrder(), getOrder()"},
            {"Caching: @Cacheable on product queries"},
            {"NoSQL (MongoDB): Add spring-boot-starter-data-mongodb"},
            {"Project: Caching and NoSQL: Cache catalog, store logs in MongoDB"},
            {"Phase 2 Review: Clean entities, fix N+1, ensure tests pass"},
            {"Security Fundamentals: Add spring-boot-starter-security, in-memory auth"},
            {"JWT Authentication: Integrate jjwt, create filter & config"},
            {"Password Encoding: BCryptPasswordEncoder"},
            {"Method Security: @PreAuthorize"},
            {"Project: Secure APIs: Protect endpoints with JWT"},
            {"OAuth2 Resource Server: Configure with Google/GitHub"},
            {"@Async: @EnableAsync, async email sending"},
            {"@Scheduled: Daily sales report with cron"},
            {"Email Sending: spring-boot-starter-mail with Mailtrap"},
            {"Project: Async Notifications: Decouple order creation"},
            {"WebFlux Intro: Reactive controller with Mono/Flux"},
            {"REST Clients: WebClient vs RestTemplate"},
            {"Project: Reactive Search: Aggregate DB + external API"},
            {"API Gateway: Spring Cloud Gateway routes"},
            {"Service Discovery: Eureka client registration"},
            {"Distributed Tracing: Sleuth + Zipkin"},
            {"Circuit Breaker: Resilience4j @CircuitBreaker"},
            {"Project: Microservices: Decompose monolith, Feign calls"},
            {"Configuration Mgmt: Externalize configs, profiles"},
            {"Secrets Mgmt: Env vars/HashiCorp Vault"},
            {"Project: Production Config: Split by profile, env vars for secrets"},
            {"Dockerizing: Dockerfile with multi-stage build"},
            {"Docker Compose: docker-compose.yml for all services"},
            {"Kubernetes: Generate K8s manifests"},
            {"CI/CD (GitHub Actions): Build -> Test -> Docker -> Push"},
            {"ELK Stack: JSON logs -> Logstash -> Kibana"},
            {"Prometheus and Grafana: Micrometer -> Prometheus -> Grafana"},
            {"Project: Full Ops Pipeline: Dockerize all, K8s manifests, CI"},
            {"Performance Tuning: Analyze heap dump, GC tuning"},
            {"Phase 3 Review: Integration tests with Testcontainers"},
            {"Testcontainers: Replace H2 with real PostgreSQL"},
            {"Mockito Deep Dive: argumentCaptor, doThrow(), static mocks"},
            {"Project: Test Suite: >80% coverage, contract tests (Pact)"},
            {"AOP: @Around aspect for logging"},
            {"Spring Events: OrderPlacedEvent with @EventListener"},
            {"RabbitMQ/Kafka: Send events to RabbitMQ"},
            {"Project: Event-Driven: Decouple via message broker"},
            {"GraphQL: spring-boot-starter-graphql"},
            {"Spring Batch: Daily sales report job"},
            {"Project: GraphQL and Batch: GraphQL API + scheduled batch"},
            {"WebSockets and STOMP: Live order tracking dashboard"},
            {"Server-Sent Events: GET /orders/{id}/stream"},
            {"Project: Real-Time: WebSocket/SSE updates"},
            {"Custom Actuator: /actuator/orders/pending-count"},
            {"Custom Metrics: Counter, Gauge, Timer"},
            {"Project: Advanced Observability: Custom health + metrics + Grafana"},
            {"Legacy XML Config: applicationContext.xml"},
            {"Custom Starter: Create your own starter"},
            {"DevTools and LiveReload: Hot swapping, auto-restart"},
            {"Project: Refactor and Optimize: Code review, fix N+1, add logging"},
            {"Migration (Boot 2->3): Check properties-migrator"},
            {"Spring Native: Build GraalVM native image"},
            {"Project: Final Polish: Complete README, architecture diagram"},
            {"Static Analysis: SpotBugs, Checkstyle, PMD"},
            {"Security Hardening: OWASP Dependency-Check, security headers"},
            {"Performance Testing: JMeter test plan (100 users)"},
            {"Backup and Recovery: PostgreSQL backup scripts"},
            {"Documentation: ADRs, OpenAPI spec, runbook"},
            {"Consolidation: Create personal cheatsheet"},
            {"CELEBRATE and PLAN: Deploy publicly, update LinkedIn"}
        };
        for (String[] row : data) {
            all.add(row[0]);
        }
        return all.toArray(new String[0]);
    }
}
