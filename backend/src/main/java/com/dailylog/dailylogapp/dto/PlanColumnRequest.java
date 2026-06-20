package com.dailylog.dailylogapp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlanColumnRequest {
    private String name;
    private String description;
    private String type;
    private Boolean isTracker;
    private Integer position;
}
