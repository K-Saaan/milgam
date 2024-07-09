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
import org.springframework.web.bind.annotation.PostMapping; // PostMapping 추가
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam; // RequestParam 추가

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
        return "login/loginPage";
    }

    /** 0708 이수민
     * 로그인 처리 메서드 추가
     */
    @PostMapping("/loginAction")
    public String login(@RequestParam String username, @RequestParam String password, Model model) {
        try {
            // 로그인 서비스 호출 및 결과 확인
            boolean success = loginService.login(username, password);
            if (success) {
                return "redirect:/home";
            } else {
                // 로그인 실패 시 에러 메시지 추가
                model.addAttribute("error", "Invalid username or password");
                return "login/loginPage";
            }
        } catch (Exception e) {
            // 예외 발생 시 에러 메시지 추가
            model.addAttribute("error", e.getMessage());
            return "login/loginPage";
        }
    }
}// 0708 이수민 최종 수정