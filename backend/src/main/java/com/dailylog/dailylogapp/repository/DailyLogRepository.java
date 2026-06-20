package com.dailylog.dailylogapp.repository;

import com.dailylog.dailylogapp.model.DailyLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DailyLogRepository extends JpaRepository<DailyLog, Long> {
    List<DailyLog> findByPlan_IdOrderByDayNumberAsc(Long planId);
    List<DailyLog> findBySection_IdOrderByDayNumberAsc(Long sectionId);
    List<DailyLog> findByPlan_IdAndUser_Id(Long planId, Long userId);
}
