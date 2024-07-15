package com.example.crowdm.dto.message;

import java.sql.Timestamp;
import lombok.Data;

@Data
public class MessageLogDto {
    private Integer logIndex;
    private Timestamp date;
    private String context;
    private String contextTitle;
    private Integer analysisIndex;
}
