package com.dailylog.dailylogapp.repository;

import com.dailylog.dailylogapp.model.PlanColumn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PlanColumnRepository extends JpaRepository<PlanColumn, Long> {
    List<PlanColumn> findByPlan_IdOrderByPosition(Long planId);
    List<PlanColumn> findByPlan_IdAndIsTrackerTrue(Long planId);
}
