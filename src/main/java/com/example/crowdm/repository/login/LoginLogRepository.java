package com.example.crowdm.repository.login;

import com.example.crowdm.entity.LoginLog.LoginLogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginLogRepository extends JpaRepository<LoginLogEntity, Long> {
}

/** 0704 이수민
 * 로그인로그 저장 위한 레포지
 */