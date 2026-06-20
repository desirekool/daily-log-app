package com.dailylog.dailylogapp.repository;

import com.dailylog.dailylogapp.model.Plan;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlanRepository extends JpaRepository<Plan, Long> {
    List<Plan> findByUser_IdAndArchivedFalse(Long userId);

    @Override
    @EntityGraph(attributePaths = {"sections", "columns", "dailyLogs", "dailyLogs.logEntries"})
    Optional<Plan> findById(Long id);
}