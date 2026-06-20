package com.dailylog.dailylogapp.service;

import com.dailylog.dailylogapp.dto.SectionProgress;
import com.dailylog.dailylogapp.dto.SectionRequest;
import com.dailylog.dailylogapp.model.*;
import com.dailylog.dailylogapp.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SectionService {

    private final SectionRepository sectionRepository;
    private final PlanRepository planRepository;
    private final PlanColumnRepository planColumnRepository;
    private final DailyLogRepository dailyLogRepository;

    @Transactional(readOnly = true)
    public List<Section> getSectionsByPlanId(Long planId) {
        return sectionRepository.findByPlan_IdOrderByPosition(planId);
    }

    @Transactional(readOnly = true)
    public Section getSectionById(Long id) {
        return sectionRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Section not found"));
    }

    @Transactional
    public Section createSection(Long planId, SectionRequest request) {
        Plan plan = planRepository.findById(planId)
            .orElseThrow(() -> new RuntimeException("Plan not found"));

        Section section = Section.builder()
            .name(request.getName())
            .description(request.getDescription())
            .position(request.getPosition() != null ? request.getPosition() : 0)
            .plan(plan)
            .build();

        return sectionRepository.save(section);
    }

    @Transactional
    public Section updateSection(Long id, SectionRequest request) {
        Section section = getSectionById(id);
        if (request.getName() != null) section.setName(request.getName());
        if (request.getDescription() != null) section.setDescription(request.getDescription());
        if (request.getPosition() != null) section.setPosition(request.getPosition());
        return sectionRepository.save(section);
    }

    @Transactional
    public void deleteSection(Long id) {
        sectionRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public SectionProgress getSectionProgress(Long sectionId) {
        Section section = getSectionById(sectionId);
        List<DailyLog> logs = dailyLogRepository.findBySection_IdOrderByDayNumberAsc(sectionId);
        List<PlanColumn> trackerColumns = planColumnRepository.findByPlan_IdAndIsTrackerTrue(section.getPlan().getId());

        long total = logs.size();
        long completed = 0;

        if (!trackerColumns.isEmpty()) {
            PlanColumn trackerCol = trackerColumns.get(0);
            for (DailyLog log : logs) {
                if (log.getLogEntries() != null) {
                    completed = log.getLogEntries().stream()
                        .filter(e -> e.getPlanColumn().getId().equals(trackerCol.getId()))
                        .filter(e -> "[x]".equalsIgnoreCase(e.getEntryValue()) || "true".equalsIgnoreCase(e.getEntryValue()))
                        .count();
                }
            }
        }

        SectionProgress progress = new SectionProgress();
        progress.setSectionId(sectionId);
        progress.setSectionName(section.getName());
        progress.setTotalLogs(total);
        progress.setCompletedLogs(completed);
        return progress;
    }
}
