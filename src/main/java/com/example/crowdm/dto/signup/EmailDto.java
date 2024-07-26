package com.example.crowdm.dto.signup;

import com.example.crowdm.entity.user.EmailEntity;
import lombok.Data;

@Data
public class EmailDto {

    /**
     * 1. ClassName: signup
     * 2. FileName : EmailDto.java
     * 3. Package  : com.example.crowdm.dto
     * 4. Comment  : 회원가입에 필요한 이메일 DTO
     * 5. 작성자   : 유병민
     * 6. 작성일   : 2024. 07. 26
     */

    private int email_index;
    private String email;
    private boolean email_status;
    private String code;

    public EmailEntity toEmailEntity(){
        return EmailEntity.builder()
                .email(email)
                .emailStatus(email_status)
                .code(code)
                .build();
    }

}
