package com.example.crowdm.service.login;

import com.example.crowdm.entity.user.UserEntity;
import com.example.crowdm.repository.login.LoginRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LoginService {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    private final LoginRepository loginRepository;

    public List<UserEntity> findAllUser(){
        List<UserEntity> userList = loginRepository.findAll();
        return userList;
    }

    @Transactional
    public int deleteUser(String userId) { // user_index에서 userId로 변경
        try {
            loginRepository.deleteById(userId); // userId 사용
            return 1;
        } catch (Exception e) {
            logger.error("error : ", e.getMessage());
            return 0;
        }
    }

    /** 0708 이수민    승인 날짜 내에 로그인 가능하게
     *
     */
    // 사용자 로그인 날짜 검증 메서드 추가
    public boolean validateLoginDates(String username) { // 메서드 추가
        UserEntity user = loginRepository.findById(username).orElse(null); // 사용자 ID로 사용자 엔티티 검색
        if (user == null) { // 사용자가 존재하지 않는 경우
            return false;
        }

        Timestamp now = Timestamp.valueOf(LocalDateTime.now()); // 현재 시간 가져오기
        // 현재 날짜가 start_date와 end_date 사이에 있는지 확인
        return (now.after(user.getStartDate()) || now.equals(user.getStartDate())) &&
                (now.before(user.getEndDate()) || now.equals(user.getEndDate())); // get_start_date와 get_end_date를 getStartDate와 getEndDate로 수정
    }

    // 로그인 메서드 수정
    public boolean login(String username, String password) throws Exception { // 예외를 던지도록 수정
        // 로그인 날짜 검증 추가
        if (!validateLoginDates(username)) { // 로그인 허용 날짜 범위 검증
            logger.error("Login attempt outside of allowed date range");
            throw new Exception("Login attempt outside of allowed date range"); // 로그인 허용 날짜 범위 벗어났다는 문장
        }

        UserEntity user = loginRepository.findById(username).orElse(null); // 사용자 ID로 사용자 엔티티 검색
        if (user == null || !user.getPw().equals(password)) { // 사용자 없거나 비밀번호 불일치 시
            return false;
        }

        // 추가적인 로그인 성공 로직 (로그인 시각 갱신 등)
        return true;
    }
}