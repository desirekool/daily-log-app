package com.dailylog.dailylogapp.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "daily_logs")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class DailyLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private LocalDate date;

    @Column(nullable = false)
    private Integer dayNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plan_id", nullable = false)
    @JsonBackReference("plan-logs")
    private Plan plan;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "section_id")
    @JsonBackReference("section-logs")
    private Section section;

    @Column(columnDefinition = "TEXT")
    private String comment;

    @Builder.Default
    @OneToMany(mappedBy = "dailyLog", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference("log-entries")
    @ToString.Exclude @EqualsAndHashCode.Exclude
    private Set<LogEntry> logEntries = new HashSet<>();

    public Long getUserId() {
        return user != null ? user.getId() : null;
    }

    public Long getPlanId() {
        return plan != null ? plan.getId() : null;
    }

    public Long getSectionId() {
        return section != null ? section.getId() : null;
    }
}
