package com.example.crowdm.service.login;

import com.example.crowdm.entity.LoginLog.LoginLogEntity;
import com.example.crowdm.repository.login.LoginLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;

@Service
public class LoginLogService {

    @Autowired
    private LoginLogRepository loginLogRepository;

    public void saveLog(String userIndex, boolean successful) {
        LoginLogEntity log = LoginLogEntity.builder()
                .userIndex(Integer.parseInt(userIndex)) // 기존 엔티티의 필드에 맞게 수정
                .loginDate(new Timestamp(System.currentTimeMillis()))
                .build();
        loginLogRepository.save(log);
    }
}
/** 0704 이수민
 *  로그인 로그 기록을 위한 서비스
 */