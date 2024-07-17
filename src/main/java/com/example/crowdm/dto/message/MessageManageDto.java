package com.example.crowdm.dto.message;

import lombok.Data;

@Data
public class MessageManageDto {
    private Integer userIndex;
    private Integer logIndex;
    private boolean confirm;
    private Integer videoIndex;
}