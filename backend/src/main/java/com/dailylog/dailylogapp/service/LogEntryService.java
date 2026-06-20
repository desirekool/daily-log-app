package com.dailylog.dailylogapp.service;

import com.dailylog.dailylogapp.model.LogEntry;
import com.dailylog.dailylogapp.repository.LogEntryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LogEntryService {

    private final LogEntryRepository logEntryRepository;

    @Transactional(readOnly = true)
    public List<LogEntry> getEntriesByLogId(Long logId) {
        return logEntryRepository.findByDailyLog_Id(logId);
    }

    @Transactional(readOnly = true)
    public LogEntry getEntryById(Long id) {
        return logEntryRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("LogEntry not found"));
    }

    @Transactional
    public LogEntry updateEntry(Long id, String value) {
        LogEntry entry = getEntryById(id);
        entry.setEntryValue(value);
        return logEntryRepository.save(entry);
    }

    @Transactional
    public void deleteEntry(Long id) {
        logEntryRepository.deleteById(id);
    }
}
