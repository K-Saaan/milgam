package com.example.crowdm.controller;

import com.example.crowdm.entity.UserEntity;
import com.example.crowdm.repository.login.LoginRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/login")
public class LoginController {

    private Logger logger = LoggerFactory.getLogger(this.getClass());
    private final LoginRepository loginRepository;


    /**
     * 1. MethodName: goLoginPage
     * 2. ClassName : LoginController
     * 3. Comment   : 로그인페이지 이동
     * 4. 작성자    : san
     * 5. 작성일    : 2024. 06. 24
     **/
    @GetMapping("/loginPage")
    public String goLoginPage(HttpServletRequest request, HttpServletResponse response, Model model) {
        String errorMessage = request.getParameter("message");

        model.addAttribute("errorMessage", errorMessage);

        // 예시 코드
        List<UserEntity> userList = loginRepository.findAll();
        System.out.println("Users : " + userList.size());

        return "login/loginPage";
    }
}
