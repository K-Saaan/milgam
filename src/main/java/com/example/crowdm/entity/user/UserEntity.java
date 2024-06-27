package com.example.crowdm.entity.user;


import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

@Getter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "users", schema="public")
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_index")
    private int user_index;

    @Column(name = "id")
    private String id;
    @Column(name = "pw")
    private String pw;
    @Column(name = "name")
    private String name;
    @Column(name = "email")
    private String email;
    @Column(name = "phone")
    private String phone;
    @Column(name = "role_index")
    private String role_index;
    @Column(name = "apply_date")
    private Timestamp apply_date;
    @Column(name = "account_lock")
    private Boolean account_lock;
    @Column(name = "last_login")
    private Timestamp last_login;
    @Column(name = "start_date")
    private Timestamp start_date;
    @Column(name = "end_date")
    private Timestamp end_date;
    @Column(name = "permission_yn")
    private Boolean permission_yn;
    @Column(name = "permission_date")
    private Timestamp permission_date;
    @Column(name = "admin_index")
    private String admin_index;
    @Column(name = "fail_cnt")
    private int fail_cnt;
    @Column(name = "pw_duedate")
    private Timestamp pw_duedate;

}
