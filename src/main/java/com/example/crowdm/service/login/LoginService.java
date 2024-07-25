package com.example.crowdm.service.login;

import com.example.crowdm.dto.user.Profile;
import com.example.crowdm.entity.event.EventEntity;
import com.example.crowdm.entity.user.UserEntity;
import com.example.crowdm.entity.admin.AdminEntity; // 0715: AdminEntity 임포트 추가
import com.example.crowdm.entity.LoginLog.LoginLogEntity;
import com.example.crowdm.repository.event.EventRepository;
import com.example.crowdm.repository.login.LoginLogRepository;
import com.example.crowdm.repository.login.LoginRepository;
import com.example.crowdm.repository.admin.AdminRepository; // 0715: AdminRepository 임포트 추가
import com.example.crowdm.service.admin.AdminService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LoginService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final LoginRepository loginRepository;
    private final EventRepository eventRepository;
    private final LoginLogRepository loginLogRepository;
    private final AdminRepository adminRepository; // 0715: AdminRepository 추가
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(); // 0715: BCryptPasswordEncoder 추가
    private final AdminService adminService; // 0723 추가됨
    public Map<String, Object> updateLogin(String userId, String password, HttpServletRequest request) {
        Map<String, Object> resultMap = new HashMap<>();

        // Null 체크
        if (userId == null || password == null || userId.isEmpty() || password.isEmpty()) {
            resultMap.put("RESULT", "INPUT_NULL");
            return resultMap;
        }

        // 사용자 ID로 사용자 정보를 데이터베이스에서 가져옴
        UserEntity user = loginRepository.findByUser(userId);
        /**
         * 1. MethodName: login
         * 2. ClassName : LoginService
         * 3. Comment   : 로그인
         * 4. 작성자    : 이수민
         * 5. 작성일    : 2024. 07. 15
         **/
        logger.info("user :: " + user);
        if (user != null) {
            logger.info("Fetched user with ID: {}", user.getId());

            // 비밀번호 검증
            if (passwordEncoder.matches(password, user.getPw())) { // 평문 비교 제거, 암호화된 비밀번호만 검증
                logger.info("Password matches for user: {}", user.getId());

                // permission_yn 확인       0715 이수민
                if (!user.getPermission_yn()) {
                    logger.info("Permission denied for user: {}", user.getId());
                    resultMap.put("RESULT", "PERMISSION_DENIED");
                    return resultMap;
                }

                // 로그인 시도 기간 확인         0715 이수민
                LocalDateTime now = LocalDateTime.now();
                LocalDateTime startDate = user.getStart_date().toLocalDateTime();
                LocalDateTime endDate = user.getEnd_date().toLocalDateTime();

                if (now.isBefore(startDate) || now.isAfter(endDate)) {
                    logger.info("Login attempt outside of allowed date range for user: {}", user.getId());
                    resultMap.put("RESULT", "OUTSIDE_DATE_RANGE");
                    return resultMap;
                }

                // 계정 잠김 여부 확인
                if (user.getAccount_lock()) {
                    logger.info("Account locked for user: {}", user.getId());
                    resultMap.put("RESULT", "LOCK_ACCOUNT");
                    adminService.unlock();
                    return resultMap;
                }

                // 로그인 성공
                resultMap.put("RESULT", "GO_MAIN");
                resultMap.put("userType", "user");
                resultMap.put("URL", "/dashboards");

                // 세션에 userId 저장
                HttpSession session = request.getSession(true);
                if (session == null) {
                    logger.error("Failed to create session for user: {}", user.getId());
                    resultMap.put("RESULT", "SESSION_CREATION_FAILED");
                    return resultMap;
                } else {
                    logger.info("Session created successfully for user: {}", user.getId());
                    session.setAttribute("userIndex", user.getUser_index());
                    Integer userIndex = (Integer) session.getAttribute("userIndex");
                    logger.info("userIndex: {}", userIndex);
                }

                // 로그인 로그 저장 -> LoginLog 테이블에 로그인 기록 저장
//                LoginLogEntity loginLog = LoginLogEntity.builder()
//                        .userIndex(user.getUser_index())
//                        .loginDate(Timestamp.valueOf(LocalDateTime.now()))
//                        .build();
//                loginLogRepository.save(loginLog);

                // 로그인 성공 로그
                logger.info("Login successful for user: {}", user.getId());

                // 실패 카운트가 1 이상일 때만 0으로 업데이트
                if (user.getFail_cnt() > 0) {
                    loginRepository.updateFailCntAndLock(userId, 0, false);
                    logger.info("Fail count reset to 0 for user: {}", user.getId());
                }

            } else {
                logger.info("Invalid password for user: {}", user.getId());

                // 실패 카운트 증가
                int failCnt = user.getFail_cnt() + 1;

                // 실패 카운트가 5 이상일 경우 계정을 잠금
                if (failCnt >= 5) {
                    loginRepository.updateFailCntAndLock(userId, failCnt, true);
                    resultMap.put("RESULT", "LOCK_ACCOUNT");
                    logger.info("Account locked due to multiple failed attempts for user: {}", user.getId());
                    // 0723 추가 시작 - AdminService 호출하여 계정 해제 및 임시 비밀번호 발송
                    adminService.unlock();
                    // 0723 추가 끝

                } else {
                    loginRepository.updateFailCntAndLock(userId, failCnt, false);
                    resultMap.put("RESULT", "INVALID_PASSWORD");
                }
            }
        } else {
            // 사용자 ID로 사용자를 찾지 못했을 경우, 관리자 ID로 관리자 정보를 가져옴
            AdminEntity admin = adminRepository.findById(userId);

            if (admin != null) {
                logger.info("Fetched admin with ID: {}", admin.getId());

                // 비밀번호 검증
                if (passwordEncoder.matches(password, admin.getPw())) { // 평문 비교 제거, 암호화된 비밀번호만 검증
                    logger.info("Password matches for admin: {}", admin.getId());

                    // 로그인 성공
                    resultMap.put("RESULT", "GO_MAIN");
                    resultMap.put("userType", "admin");
                    resultMap.put("URL", "/admin/approval");

                    // 세션에 adminId 저장
                    HttpSession session = request.getSession(true);
                    session.setAttribute("adminIndex", admin.getAdmin_index());

                    // 관리자 로그인 성공 로그
                    logger.info("Login successful for admin: {}", admin.getId());
                } else {
                    logger.info("Invalid password for admin: {}", admin.getId());
                    resultMap.put("RESULT", "INVALID_PASSWORD");
                }
            } else {
                logger.info("User not found for userId: {}", userId);
                resultMap.put("RESULT", "USER_NOT_FOUND");
            }
        }

        return resultMap;
    }

    public String getEventTitle(Integer event_index) {
        Optional<EventEntity> eventOptional = eventRepository.findById(event_index);
        EventEntity event = eventOptional.get();
        return event.getTitle();
    }
    public Profile getProfile(HttpServletRequest request){
        //session
        HttpSession session = request.getSession();
        Integer user_index = (Integer) session.getAttribute("userIndex");

        Optional<UserEntity> userOptional = loginRepository.findById(user_index);
        UserEntity user = userOptional.get();
        Profile profile = new Profile();
        profile.setUser_index(user_index);
        profile.setEmail(user.getEmail());
        profile.setName(user.getName());
        profile.setOrg(user.getOrg());
        profile.setPhone(user.getPhone());
        profile.setId(user.getId());
        profile.setEvent(getEventTitle(user.getEvent_index()));

        return profile;
    }

    @Transactional
    public String UpdateEventAtProfile(Integer event_index, HttpServletRequest request){
        //session
        HttpSession session = request.getSession();
        Integer user_index = (Integer) session.getAttribute("userIndex");

        Optional<UserEntity> userOptional = loginRepository.findById(user_index);
        UserEntity user = userOptional.get();
        user.updateEvent(event_index);
        loginRepository.save(user);
        return "ok";
    }

}