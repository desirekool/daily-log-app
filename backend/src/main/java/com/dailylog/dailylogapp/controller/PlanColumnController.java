package com.dailylog.dailylogapp.controller;

import com.dailylog.dailylogapp.dto.PlanColumnRequest;
import com.dailylog.dailylogapp.model.Plan;
import com.dailylog.dailylogapp.model.PlanColumn;
import com.dailylog.dailylogapp.repository.PlanColumnRepository;
import com.dailylog.dailylogapp.repository.PlanRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plans/{planId}/columns")
@RequiredArgsConstructor
public class PlanColumnController {

    private final PlanColumnRepository planColumnRepository;
    private final PlanRepository planRepository;

    @GetMapping
    public ResponseEntity<List<PlanColumn>> getColumns(@PathVariable Long planId) {
        return ResponseEntity.ok(planColumnRepository.findByPlan_IdOrderByPosition(planId));
    }

    @PostMapping
    public ResponseEntity<PlanColumn> createColumn(@PathVariable Long planId, @RequestBody PlanColumnRequest request) {
        Plan plan = planRepository.findById(planId)
            .orElseThrow(() -> new RuntimeException("Plan not found"));
        PlanColumn column = PlanColumn.builder()
            .name(request.getName())
            .description(request.getDescription())
            .type(request.getType() != null ? request.getType() : "text")
            .isTracker(request.getIsTracker() != null ? request.getIsTracker() : false)
            .position(request.getPosition() != null ? request.getPosition() : 0)
            .plan(plan)
            .build();
        return ResponseEntity.ok(planColumnRepository.save(column));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PlanColumn> updateColumn(@PathVariable Long id, @RequestBody PlanColumnRequest request) {
        PlanColumn column = planColumnRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("PlanColumn not found"));
        if (request.getName() != null) column.setName(request.getName());
        if (request.getDescription() != null) column.setDescription(request.getDescription());
        if (request.getType() != null) column.setType(request.getType());
        if (request.getIsTracker() != null) column.setIsTracker(request.getIsTracker());
        if (request.getPosition() != null) column.setPosition(request.getPosition());
        return ResponseEntity.ok(planColumnRepository.save(column));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteColumn(@PathVariable Long id) {
        planColumnRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
