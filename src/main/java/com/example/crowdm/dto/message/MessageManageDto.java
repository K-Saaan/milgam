package com.example.crowdm.dto.message;

import lombok.Data;

/**
 * 1. MethodName: MessageManageDto
 * 2. ClassName : MessageManageDto
 * 3. Comment   : 메세지매니지먼트 DTO 설정
 * 4. 작성자    : been
 * 5. 작성일    : 2024. 07. 26
 **/
@Data
public class MessageManageDto {
    private Integer userIndex;
    private Integer logIndex;
    private boolean confirm;
    private Integer videoIndex;
}