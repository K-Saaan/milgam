package com.example.crowdm.service.login;


import com.example.crowdm.entity.user.UserEntity;
import com.example.crowdm.repository.login.LoginRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class LoginService {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    private final LoginRepository loginRepository;

    public Map<String, Object> updateLogin(String userId, String password, HttpServletRequest request) {
        Map<String,Object> resultMap= new HashMap<String, Object>();

        // Null 체크
        if ("".equals(userId) || "".equals(password)) {
            resultMap.put("RESULT", "INPUT_NULL");
            resultMap.put("URL", "");
            return resultMap;
        }

        UserEntity user = loginRepository.findByUser(userId, password);

        logger.info("user :: " + user);
        if(user != null) {
            logger.info("login success >>>>>>>");

            // 계정잠김 여부 확인
            if(user.getAccount_lock()) {
                resultMap.put("RESULT", "LOCK_ACCOUNT");
                resultMap.put("URL", "");
                return resultMap;
            }


            // 메인으로 이동
            resultMap.put("RESULT", "GO_MAIN");
            resultMap.put("URL", "/dashboards");

        }

        HttpSession session = request.getSession(true);
        session.removeAttribute("userId");
        session.setAttribute("userId", userId);

        return resultMap;
    }
}
