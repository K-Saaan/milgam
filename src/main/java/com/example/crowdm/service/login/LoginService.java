package com.example.crowdm.service.login;

import com.example.crowdm.entity.user.UserEntity;
import com.example.crowdm.repository.User.UserRepository;
import com.example.crowdm.repository.login.LoginRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LoginService {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    private final LoginRepository loginRepository;
    private final UserRepository userRepository;

    public List<UserEntity> findAllUser() {
        return userRepository.findAll();
    }

    @Transactional
    public int deleteUser(String userId) {
        try {
            userRepository.deleteById(userId);
            return 1;
        } catch (Exception e) {
            logger.error("error : ", e.getMessage());
            return 0;
        }
    }

    /** 0708 이수민    승인 날짜 내에 로그인 가능하게
     *
     */
    public boolean validateLoginDates(String username) {
        UserEntity user = userRepository.findById(username).orElse(null);
        if (user == null) {
            return false;
        }

        Timestamp now = Timestamp.valueOf(LocalDateTime.now());
        return (now.after(user.getStartDate()) || now.equals(user.getStartDate())) &&
                (now.before(user.getEndDate()) || now.equals(user.getEndDate()));
    }

    public boolean login(String username, String password) throws Exception {
        if (!validateLoginDates(username)) {
            logger.error("Login attempt outside of allowed date range");
            throw new Exception("Login attempt outside of allowed date range");
        }

        UserEntity user = userRepository.findById(username).orElse(null);
        if (user == null || !user.getPw().equals(password)) {
            return false;
        }

        return true;
    }

    public String validateLogin(String username, String password) {
        Optional<UserEntity> userOptional = userRepository.findById(username);
        if (userOptional.isPresent()) {
            UserEntity user = userOptional.get();
            if (isLoginPeriodValid(user) && isPasswordValid(user, password)) {
                return "SUCCESS";
            }
            return "정보를 확인하세요";
        }
        return "정보를 확인하세요";
    }

    private boolean isLoginPeriodValid(UserEntity user) {
        LocalDate now = LocalDate.now();
        LocalDate startDate = user.getStartDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        LocalDate endDate = user.getEndDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        return !startDate.isAfter(now) && !endDate.isBefore(now);
    }

    private boolean isPasswordValid(UserEntity user, String password) {
        return user.getPw().equals(password);
    }
}