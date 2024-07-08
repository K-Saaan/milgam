package com.example.crowdm.dto.user;

import com.example.crowdm.entity.user.UserEntity;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class UserDTO {
    private String id;
    private String username;
    private String password;
    private String email;
    private String phone;
    private String role_index;
    private Timestamp start_date;
    private Timestamp end_date;
    private String org;
    private String org_phone;


    public UserEntity toEntity() {
        return UserEntity.builder()
                .id(id)
                .pw(password)
                .email(email)
                .phone(phone)
                .role_index(role_index)
                .start_date(start_date)
                .end_date(end_date)
                .org(org)
                .org_phone(org_phone)
                .build();
    }

}
