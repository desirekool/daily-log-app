package com.dailylog.dailylogapp.model;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "log_entries")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class LogEntry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "entry_value", columnDefinition = "TEXT")
    private String entryValue;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "daily_log_id", nullable = false)
    @JsonBackReference("log-entries")
    private DailyLog dailyLog;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "plan_column_id", nullable = false)
    private PlanColumn planColumn;

    public Long getPlanColumnId() {
        return planColumn != null ? planColumn.getId() : null;
    }

    public Long getDailyLogId() {
        return dailyLog != null ? dailyLog.getId() : null;
    }
}
