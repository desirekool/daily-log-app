package com.dailylog.dailylogapp.repository;

import com.dailylog.dailylogapp.model.LogEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LogEntryRepository extends JpaRepository<LogEntry, Long> {
    List<LogEntry> findByDailyLog_Id(Long dailyLogId);
    void deleteByDailyLog_Id(Long dailyLogId);
}
