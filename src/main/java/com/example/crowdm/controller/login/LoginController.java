package com.example.crowdm.controller.login;

import com.example.crowdm.entity.user.UserEntity;
import com.example.crowdm.repository.login.LoginRepository;
import com.example.crowdm.service.login.LoginService;
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
    private final LoginService loginService;

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
        List<UserEntity> userList = loginService.findAllUser();
        System.out.println("Users : " + userList.size());
        System.out.println("UserList : " + userList);

        loginService.deleteUser(userList.get(0).getUser_index());

        List<UserEntity> userList2 = loginService.findAllUser();
        System.out.println("Users : " + userList2.size());
        System.out.println("UserList : " + userList2);

        return "login/loginPage";
    }
}
