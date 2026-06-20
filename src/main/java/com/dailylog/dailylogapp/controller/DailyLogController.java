package com.dailylog.dailylogapp.controller;

import com.dailylog.dailylogapp.dto.DailyLogRequest;
import com.dailylog.dailylogapp.model.DailyLog;
import com.dailylog.dailylogapp.model.User;
import com.dailylog.dailylogapp.repository.UserRepository;
import com.dailylog.dailylogapp.service.DailyLogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plans/{planId}")
@RequiredArgsConstructor
public class DailyLogController {

    private final DailyLogService dailyLogService;
    private final UserRepository userRepository;

    @GetMapping("/logs")
    public ResponseEntity<List<DailyLog>> getLogs(@PathVariable Long planId) {
        return ResponseEntity.ok(dailyLogService.getLogsByPlanId(planId));
    }

    @GetMapping("/sections/{sectionId}/logs")
    public ResponseEntity<List<DailyLog>> getLogsBySection(@PathVariable Long sectionId) {
        return ResponseEntity.ok(dailyLogService.getLogsBySectionId(sectionId));
    }

    @GetMapping("/logs/{logId}")
    public ResponseEntity<DailyLog> getLog(@PathVariable Long logId) {
        return ResponseEntity.ok(dailyLogService.getLogById(logId));
    }

    @PostMapping("/logs")
    public ResponseEntity<DailyLog> createLog(
            @PathVariable Long planId,
            @RequestBody DailyLogRequest request,
            Authentication authentication) {
        User user = userRepository.findByUsername(authentication.getName())
            .orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(dailyLogService.createLog(planId, request, user.getId()));
    }

    @PutMapping("/logs/{logId}")
    public ResponseEntity<DailyLog> updateLog(
            @PathVariable Long logId,
            @RequestBody DailyLogRequest request) {
        return ResponseEntity.ok(dailyLogService.updateLog(logId, request));
    }

    @DeleteMapping("/logs/{logId}")
    public ResponseEntity<Void> deleteLog(@PathVariable Long logId) {
        dailyLogService.deleteLog(logId);
        return ResponseEntity.noContent().build();
    }
}
