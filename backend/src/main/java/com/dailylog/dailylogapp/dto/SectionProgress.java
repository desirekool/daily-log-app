package com.dailylog.dailylogapp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SectionProgress {
    private Long sectionId;
    private String sectionName;
    private long totalLogs;
    private long completedLogs;

    public double getPercentage() {
        return totalLogs == 0 ? 0 : (double) completedLogs / totalLogs * 100;
    }
}
