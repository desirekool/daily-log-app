package com.dailylog.dailylogapp.repository;

import com.dailylog.dailylogapp.model.Section;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SectionRepository extends JpaRepository<Section, Long> {
    List<Section> findByPlan_IdOrderByPosition(Long planId);
    long countByPlan_Id(Long planId);
}
