package com.example.crowdm.dto.message;

import java.sql.Timestamp;
import lombok.Data;

/**
 * 1. MethodName: MessageLogDto
 * 2. ClassName : MessageLogDto
 * 3. Comment   : 메세지로그 DTO 설정
 * 4. 작성자    : been
 * 5. 작성일    : 2024. 07. 26
 **/
@Data
public class MessageLogDto {
    private Integer logIndex;
    private Timestamp date;
    private String context;
    private String contextTitle;
    private Integer analysisIndex;
}
