package com.example.crowdm.service.login;

import com.example.crowdm.entity.user.UserEntity;
import com.example.crowdm.entity.LoginLog.LoginLogEntity;
import com.example.crowdm.repository.login.LoginLogRepository;
import com.example.crowdm.repository.login.LoginRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class LoginService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final LoginRepository loginRepository;
    private final LoginLogRepository loginLogRepository;
    private final PasswordEncoder passwordEncoder;

    public Map<String, Object> updateLogin(String userId, String password, HttpServletRequest request) {
        Map<String, Object> resultMap = new HashMap<>();

        // Null 체크
        if (userId == null || password == null || userId.isEmpty() || password.isEmpty()) {
            resultMap.put("RESULT", "INPUT_NULL");
            return resultMap;
        }

        UserEntity user = loginRepository.findByUser(userId);

        logger.info("user :: " + user);
        if (user != null) {
            logger.info("login success >>>>>>>");

            // 비밀번호 검증
            if (passwordEncoder.matches(password, user.getPw())) {
                logger.info("Login success for user: {}", user.getId());

                // 계정 잠김 여부 확인
                if (user.getAccount_lock()) {
                    resultMap.put("RESULT", "LOCK_ACCOUNT");
                    return resultMap;
                }

                // 로그인 성공
                resultMap.put("RESULT", "GO_MAIN");
                resultMap.put("URL", "/dashboards");

                // 세션에 userId 저장
                HttpSession session = request.getSession(true);
                session.setAttribute("userIndex", user.getUser_index());

                // 로그인 로그 저장 -> LoginLog table
                LoginLogEntity loginLog = LoginLogEntity.builder()
                        .userIndex(user.getUser_index())
                        .loginDate(Timestamp.valueOf(LocalDateTime.now()))
                        .build();
                loginLogRepository.save(loginLog);

            } else {
                logger.info("Login failed for user: {}", user.getId());
                resultMap.put("RESULT", "INVALID_PASSWORD");
            }
        } else {
            logger.info("User not found for userId: {}", userId);
            resultMap.put("RESULT", "USER_NOT_FOUND");
        }

        return resultMap;
    }
}