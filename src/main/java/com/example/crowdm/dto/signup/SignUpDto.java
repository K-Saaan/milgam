package com.example.crowdm.dto.signup;

import com.example.crowdm.entity.user.UserEntity;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class SignUpDto {
    private int user_index;
    private String id;
    private String pw;
    private String name;
    private String email;
    private String phone;
    private int role_index; // This should be int as mentioned
    private String org;
    private String org_phone;
    private Integer event_index;
    private Timestamp apply_date;
    private Boolean account_lock;
    private Timestamp last_login;
    private Timestamp start_date;
    private Timestamp end_date;
    private Boolean permission_yn;
    private Timestamp permission_date;
    private int admin_index;
    private int fail_cnt;
    private Timestamp pw_duedate;
    private String temppw;

    public UserEntity toUserEntity() {
        return UserEntity.builder()
                .id(id)
                .name(name)
                .email(email)
                .pw(pw)
                .phone(phone)
                .role_index(role_index)
                .start_date(start_date)
                .end_date(end_date)
                .org(org)
                .org_phone(org_phone)
                .event_index(event_index)
                .apply_date(apply_date)
                .account_lock(account_lock)
                .last_login(last_login)
                .permission_yn(permission_yn)
                .permission_date(permission_date)
                .admin_index(admin_index)
                .fail_cnt(fail_cnt)
                .pw_duedate(pw_duedate)
                .temppw(temppw)
                .build();
    }

}
