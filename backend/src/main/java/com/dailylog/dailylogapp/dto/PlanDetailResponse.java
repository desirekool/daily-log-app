package com.dailylog.dailylogapp.dto;

import com.dailylog.dailylogapp.model.Plan;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class PlanDetailResponse {
    private Plan plan;
    private List<SectionProgress> sectionProgress;
}
