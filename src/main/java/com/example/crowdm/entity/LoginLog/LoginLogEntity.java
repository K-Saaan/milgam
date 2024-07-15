package com.example.crowdm.entity.LoginLog;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

@Getter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "loging_log")
public class LoginLogEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "login_index") //login 인덱스
    private int loginIndex;

    @Column(name = "user_index", nullable = false) //로그인 시도 사용자 인덱스
    private int userIndex;

    @Column(name = "login_date", nullable = false)
    private Timestamp loginDate;

    @Column(name = "logout_date")
    private Timestamp logoutDate;
}

/** 로그인 로그 기록/ 테이블
 * 0701 이수민
 */