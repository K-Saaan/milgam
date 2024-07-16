package com.example.crowdm.dto.message;

import lombok.Data;

@Data
public class MessageDto {
    private long userIndex;
    private int logIndex;
    private boolean confirm;
    private int videoIndex;
}