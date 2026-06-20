package com.dailylog.dailylogapp.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "plans")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Plan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Builder.Default
    @Column(nullable = false)
    private boolean archived = false;

    public enum Phase { SETUP, HYDRATE, EXECUTE, REVIEW }

    @Builder.Default
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Phase phase = Phase.SETUP;

    @Builder.Default
    @OneToMany(mappedBy = "plan", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonManagedReference("plan-logs")
    @ToString.Exclude @EqualsAndHashCode.Exclude
    private Set<DailyLog> dailyLogs = new HashSet<>();

    @Builder.Default
    @OneToMany(mappedBy = "plan", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("position ASC")
    @JsonManagedReference("plan-columns")
    @ToString.Exclude @EqualsAndHashCode.Exclude
    private Set<PlanColumn> columns = new HashSet<>();

    @Builder.Default
    @OneToMany(mappedBy = "plan", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @OrderBy("position ASC")
    @JsonManagedReference("plan-sections")
    @ToString.Exclude @EqualsAndHashCode.Exclude
    private Set<Section> sections = new HashSet<>();

    public Long getUserId() {
        return user != null ? user.getId() : null;
    }
}
