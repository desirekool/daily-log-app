package com.dailylog.dailylogapp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlanRequest {
    private String name;
    private String description;
    private List<SectionRequest> sections;
    private List<PlanColumnRequest> columns;
    private String phase;
}
