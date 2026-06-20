package com.dailylog.dailylogapp.controller;

import com.dailylog.dailylogapp.dto.SectionProgress;
import com.dailylog.dailylogapp.dto.SectionRequest;
import com.dailylog.dailylogapp.model.Section;
import com.dailylog.dailylogapp.service.SectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plans/{planId}/sections")
@RequiredArgsConstructor
public class SectionController {

    private final SectionService sectionService;

    @GetMapping
    public ResponseEntity<List<Section>> getSections(@PathVariable Long planId) {
        return ResponseEntity.ok(sectionService.getSectionsByPlanId(planId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Section> getSection(@PathVariable Long id) {
        return ResponseEntity.ok(sectionService.getSectionById(id));
    }

    @PostMapping
    public ResponseEntity<Section> createSection(@PathVariable Long planId, @RequestBody SectionRequest request) {
        return ResponseEntity.ok(sectionService.createSection(planId, request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Section> updateSection(@PathVariable Long id, @RequestBody SectionRequest request) {
        return ResponseEntity.ok(sectionService.updateSection(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSection(@PathVariable Long id) {
        sectionService.deleteSection(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/progress")
    public ResponseEntity<SectionProgress> getSectionProgress(@PathVariable Long planId, @PathVariable Long id) {
        return ResponseEntity.ok(sectionService.getSectionProgress(id));
    }
}
