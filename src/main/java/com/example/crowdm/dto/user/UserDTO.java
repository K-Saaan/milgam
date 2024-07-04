package com.example.crowdm.dto.user;

import com.example.crowdm.entity.user.UserEntity;
import lombok.Data;

@Data
public class UserDTO {
    private String id;
    private String username;
    private String password;
    private String email;
    private String phone;
    private String role_index;

    public UserEntity toEntity() {
        return UserEntity.builder()
                .id(id)
                .pw(password)
                .email(email)
                .phone(phone)
                .role_index(role_index)
                .build();
    }

}
