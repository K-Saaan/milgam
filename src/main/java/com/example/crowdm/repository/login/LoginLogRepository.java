package com.example.crowdm.repository.login;

import com.example.crowdm.entity.LoginLog.LoginLogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
/**
 * 1. MethodName: 로그인로그저장 레포지토리
 * 2. ClassName : LoginLogRepository
 * 3. Comment   : 로그인
 * 4. 작성자    : 이수민
 * 5. 작성일    : 2024. 07. 04
 **/
@Repository
public interface LoginLogRepository extends JpaRepository<LoginLogEntity, Long> {
}

/** 0704 이수민
 * 로그인로그 저장 위한 레포지
 */