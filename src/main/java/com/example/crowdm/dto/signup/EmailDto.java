package com.example.crowdm.dto.signup;

import com.example.crowdm.entity.user.EmailEntity;
import lombok.Data;

@Data
public class EmailDto {

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
