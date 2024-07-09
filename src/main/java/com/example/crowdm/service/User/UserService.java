package com.example.crowdm.service.User;

/** 0702 이수민
 * 로그인 가능 기간에 로그인 할 수 있게
 */

import com.example.crowdm.entity.user.UserEntity;
import com.example.crowdm.repository.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public String validateLogin(String username, String password) {
        Optional<UserEntity> userOptional = userRepository.findById(username);
        if (userOptional.isPresent()) {
            UserEntity user = userOptional.get();
            LocalDate now = LocalDate.now();
            LocalDate startDate = user.getStart_date().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            LocalDate endDate = user.getEnd_date().toInstant().atZone(ZoneId.systemDefault()).toLocalDate();

            if (startDate.isAfter(now) || endDate.isBefore(now)) {
                return "계정 만료";
            }

            if (!user.getPw().equals(password)) {
                return "정보를 확인하세요";
            }

            return "SUCCESS";
        }
        return "정보를 확인하세요";
    }
}