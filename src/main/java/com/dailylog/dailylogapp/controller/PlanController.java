package com.dailylog.dailylogapp.controller;

import com.dailylog.dailylogapp.dto.PlanDetailResponse;
import com.dailylog.dailylogapp.dto.PlanRequest;
import com.dailylog.dailylogapp.model.Plan;
import com.dailylog.dailylogapp.model.User;
import com.dailylog.dailylogapp.repository.UserRepository;
import com.dailylog.dailylogapp.service.PlanService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plans")
@RequiredArgsConstructor
public class PlanController {

    private final PlanService planService;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<List<Plan>> getAllPlans(Authentication authentication) {
        User user = userRepository.findByUsername(authentication.getName())
            .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(planService.getPlansByUserId(user.getId()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Plan> getPlanById(@PathVariable Long id) {
        return ResponseEntity.ok(planService.getPlanById(id));
    }

    @GetMapping("/{id}/detail")
    public ResponseEntity<PlanDetailResponse> getPlanDetail(@PathVariable Long id) {
        return ResponseEntity.ok(planService.getPlanDetail(id));
    }

    @PostMapping
    public ResponseEntity<Plan> createPlan(@RequestBody PlanRequest request, Authentication authentication) {
        User user = userRepository.findByUsername(authentication.getName())
            .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(planService.createPlan(request, user.getId()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PlanDetailResponse> updatePlan(@PathVariable Long id, @RequestBody PlanRequest request) {
        return ResponseEntity.ok(planService.updatePlan(id, request));
    }

    @PutMapping("/{id}/phase")
    public ResponseEntity<PlanDetailResponse> updatePhase(@PathVariable Long id, @RequestBody String phase) {
        return ResponseEntity.ok(planService.updatePhase(id, phase));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePlan(@PathVariable Long id) {
        planService.deletePlan(id);
        return ResponseEntity.noContent().build();
    }
}
