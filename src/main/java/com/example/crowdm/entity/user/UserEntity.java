package com.example.crowdm.entity.user;


import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.sql.Timestamp;

@Getter
@Entity
@Builder
@DynamicUpdate
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
    private String role_index; //이거 int임
    @Column(name = "org")
    private String org;
    @Column(name = "org_phone")
    private String org_phone;
    @Column(name = "event_index")
    private Integer event_index;
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
    @Column(name = "temppw")
    private String temppw;


    @Transactional
    public void updatePermissionYn(Timestamp permission_date){
        this.permission_yn = true;
        this.permission_date=permission_date;
        //this.admin_index=1; 나중에 세션값으로 바꿔야함

    }
    @Transactional
    public void updateUnlock(String temppw){
        this.temppw=temppw;
        this.account_lock=false;
        this.fail_cnt=0;
    }


    public UserEntity(String id, String pw, String name, String email) {
        this.id = id;
    }
}

