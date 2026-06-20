package com.dailylog.dailylogapp.service;

import com.dailylog.dailylogapp.dto.DailyLogRequest;
import com.dailylog.dailylogapp.model.*;
import com.dailylog.dailylogapp.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.*;

@Service
@RequiredArgsConstructor
public class DailyLogService {

    private final DailyLogRepository dailyLogRepository;
    private final LogEntryRepository logEntryRepository;
    private final PlanRepository planRepository;
    private final SectionRepository sectionRepository;
    private final PlanColumnRepository planColumnRepository;
    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public List<DailyLog> getLogsByPlanId(Long planId) {
        return dailyLogRepository.findByPlan_IdOrderByDayNumberAsc(planId);
    }

    @Transactional(readOnly = true)
    public List<DailyLog> getLogsBySectionId(Long sectionId) {
        return dailyLogRepository.findBySection_IdOrderByDayNumberAsc(sectionId);
    }

    @Transactional(readOnly = true)
    public DailyLog getLogById(Long id) {
        return dailyLogRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("DailyLog not found"));
    }

    @Transactional
    public DailyLog createLog(Long planId, DailyLogRequest request, Long userId) {
        Plan plan = planRepository.findById(planId)
            .orElseThrow(() -> new RuntimeException("Plan not found"));
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        Section section = null;
        if (request.getSectionId() != null) {
            section = sectionRepository.findById(request.getSectionId())
                .orElse(null);
        } else {
            List<Section> sections = sectionRepository.findByPlan_IdOrderByPosition(planId);
            if (!sections.isEmpty()) {
                section = sections.get(0);
            }
        }

        Integer dayNumber = request.getDayNumber();
        if (dayNumber == null) {
            List<DailyLog> existing = dailyLogRepository.findByPlan_IdOrderByDayNumberAsc(planId);
            dayNumber = existing.isEmpty() ? 1 : existing.get(existing.size() - 1).getDayNumber() + 1;
        }

        DailyLog log = DailyLog.builder()
            .date(request.getDate() != null ? request.getDate() : LocalDate.now())
            .dayNumber(dayNumber)
            .user(user)
            .plan(plan)
            .section(section)
            .comment(request.getComment())
            .build();
        log = dailyLogRepository.save(log);

        if (request.getEntries() != null) {
            for (Map.Entry<Long, String> entry : request.getEntries().entrySet()) {
                PlanColumn column = planColumnRepository.findById(entry.getKey())
                    .orElseThrow(() -> new RuntimeException("PlanColumn not found: " + entry.getKey()));
                LogEntry logEntry = LogEntry.builder()
                    .entryValue(entry.getValue())
                    .dailyLog(log)
                    .planColumn(column)
                    .build();
                logEntryRepository.save(logEntry);
            }
        }

        return dailyLogRepository.findById(log.getId()).orElse(log);
    }

    @Transactional
    public DailyLog updateLog(Long logId, DailyLogRequest request) {
        DailyLog log = getLogById(logId);

        if (request.getDate() != null) log.setDate(request.getDate());
        if (request.getDayNumber() != null) log.setDayNumber(request.getDayNumber());
        if (request.getComment() != null) log.setComment(request.getComment());

        if (request.getSectionId() != null) {
            Section section = sectionRepository.findById(request.getSectionId()).orElse(null);
            log.setSection(section);
        }

        if (request.getEntries() != null) {
            logEntryRepository.deleteByDailyLog_Id(logId);
            for (Map.Entry<Long, String> entry : request.getEntries().entrySet()) {
                PlanColumn column = planColumnRepository.findById(entry.getKey())
                    .orElseThrow(() -> new RuntimeException("PlanColumn not found"));
                LogEntry logEntry = LogEntry.builder()
                    .entryValue(entry.getValue())
                    .dailyLog(log)
                    .planColumn(column)
                    .build();
                logEntryRepository.save(logEntry);
            }
        }

        return dailyLogRepository.findById(logId).orElse(log);
    }

    @Transactional
    public void deleteLog(Long id) {
        logEntryRepository.deleteByDailyLog_Id(id);
        dailyLogRepository.deleteById(id);
    }
}
