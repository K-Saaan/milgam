package com.example.crowdm.dto.message;

import lombok.Data;

@Data
public class MessageDto {
    private int userIndex;
    private int logIndex;
    private boolean confirm;
    private int videoIndex;
}