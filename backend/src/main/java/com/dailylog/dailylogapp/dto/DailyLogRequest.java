package com.dailylog.dailylogapp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.Map;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DailyLogRequest {
    private LocalDate date;
    private Integer dayNumber;
    private Long sectionId;
    private String comment;
    private Map<Long, String> entries;
}
