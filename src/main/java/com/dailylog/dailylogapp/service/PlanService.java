package com.dailylog.dailylogapp.service;

import com.dailylog.dailylogapp.dto.PlanColumnRequest;
import com.dailylog.dailylogapp.dto.PlanDetailResponse;
import com.dailylog.dailylogapp.dto.PlanRequest;
import com.dailylog.dailylogapp.dto.SectionProgress;
import com.dailylog.dailylogapp.dto.SectionRequest;
import com.dailylog.dailylogapp.model.Plan;
import com.dailylog.dailylogapp.model.PlanColumn;
import com.dailylog.dailylogapp.model.Section;
import com.dailylog.dailylogapp.model.User;
import com.dailylog.dailylogapp.repository.PlanRepository;
import com.dailylog.dailylogapp.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PlanService {

    private final PlanRepository planRepository;
    private final UserRepository userRepository;
    private final SectionService sectionService;

    @Transactional(readOnly = true)
    public List<Plan> getAllPlans() {
        return planRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Plan> getPlansByUserId(Long userId) {
        return planRepository.findByUser_IdAndArchivedFalse(userId);
    }

    @Transactional(readOnly = true)
    public Plan getPlanById(Long id) {
        return planRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Plan not found"));
    }

    @Transactional(readOnly = true)
    public PlanDetailResponse getPlanDetail(Long id) {
        Plan plan = planRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Plan not found"));
        List<SectionProgress> progress = plan.getSections().stream()
            .map(s -> sectionService.getSectionProgress(s.getId()))
            .toList();
        return new PlanDetailResponse(plan, progress);
    }

    @Transactional
    public Plan createPlan(PlanRequest request, Long userId) {
        User user = userRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));

        Plan.Phase initialPhase = Plan.Phase.SETUP;
        if (request.getPhase() != null) {
            try { initialPhase = Plan.Phase.valueOf(request.getPhase().toUpperCase()); }
            catch (IllegalArgumentException e) { initialPhase = Plan.Phase.SETUP; }
        }
        Plan plan = Plan.builder()
            .name(request.getName())
            .description(request.getDescription())
            .user(user)
            .phase(initialPhase)
            .build();
        plan = planRepository.save(plan);

        if (request.getSections() != null && !request.getSections().isEmpty()) {
            for (SectionRequest sr : request.getSections()) {
                Section section = Section.builder()
                    .name(sr.getName())
                    .description(sr.getDescription())
                    .position(sr.getPosition() != null ? sr.getPosition() : 0)
                    .plan(plan)
                    .build();
                plan.getSections().add(section);
            }
        } else {
            Section defaultSection = Section.builder()
                .name("Main")
                .description("Default section")
                .position(0)
                .plan(plan)
                .build();
            plan.getSections().add(defaultSection);
        }

        if (request.getColumns() != null && !request.getColumns().isEmpty()) {
            for (PlanColumnRequest cr : request.getColumns()) {
                PlanColumn column = PlanColumn.builder()
                    .name(cr.getName())
                    .description(cr.getDescription())
                    .type(cr.getType() != null ? cr.getType() : "text")
                    .isTracker(cr.getIsTracker() != null ? cr.getIsTracker() : false)
                    .position(cr.getPosition() != null ? cr.getPosition() : 0)
                    .plan(plan)
                    .build();
                plan.getColumns().add(column);
            }
        } else {
            addDefaultColumns(plan);
        }

        return planRepository.save(plan);
    }

    @Transactional
    public PlanDetailResponse updatePlan(Long id, PlanRequest request) {
        Plan plan = planRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Plan not found"));

        if (request.getName() != null) {
            plan.setName(request.getName());
        }
        if (request.getDescription() != null) {
            plan.setDescription(request.getDescription());
        }

        if (request.getSections() != null) {
            plan.getSections().clear();
            for (SectionRequest sr : request.getSections()) {
                Section section = Section.builder()
                    .name(sr.getName())
                    .description(sr.getDescription())
                    .position(sr.getPosition() != null ? sr.getPosition() : 0)
                    .plan(plan)
                    .build();
                plan.getSections().add(section);
            }
        }

        if (request.getColumns() != null) {
            plan.getColumns().clear();
            for (PlanColumnRequest cr : request.getColumns()) {
                PlanColumn column = PlanColumn.builder()
                    .name(cr.getName())
                    .description(cr.getDescription())
                    .type(cr.getType() != null ? cr.getType() : "text")
                    .isTracker(cr.getIsTracker() != null ? cr.getIsTracker() : false)
                    .position(cr.getPosition() != null ? cr.getPosition() : 0)
                    .plan(plan)
                    .build();
                plan.getColumns().add(column);
            }
        }

        if (request.getPhase() != null) {
            try { plan.setPhase(Plan.Phase.valueOf(request.getPhase().toUpperCase())); }
            catch (IllegalArgumentException e) { /* ignore invalid phase */ }
        }

        plan = planRepository.save(plan);
        List<SectionProgress> progress = plan.getSections().stream()
            .map(s -> sectionService.getSectionProgress(s.getId()))
            .toList();
        return new PlanDetailResponse(plan, progress);
    }

    @Transactional
    public PlanDetailResponse updatePhase(Long id, String phase) {
        Plan plan = planRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Plan not found"));
        try {
            plan.setPhase(Plan.Phase.valueOf(phase.toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid phase: " + phase);
        }
        plan = planRepository.save(plan);
        List<SectionProgress> progress = plan.getSections().stream()
            .map(s -> sectionService.getSectionProgress(s.getId()))
            .toList();
        return new PlanDetailResponse(plan, progress);
    }

    @Transactional
    public void deletePlan(Long id) {
        planRepository.deleteById(id);
    }

    private void addDefaultColumns(Plan plan) {
        String[][] defaults = {
            {"Day", "Day number", "text", "false"},
            {"Task", "Description of the task", "text", "false"},
            {"Tracker", "Completion status", "checkbox", "true"}
        };
        for (int i = 0; i < defaults.length; i++) {
            PlanColumn col = PlanColumn.builder()
                .name(defaults[i][0])
                .description(defaults[i][1])
                .type(defaults[i][2])
                .isTracker(Boolean.parseBoolean(defaults[i][3]))
                .position(i)
                .plan(plan)
                .build();
            plan.getColumns().add(col);
        }
    }
}
