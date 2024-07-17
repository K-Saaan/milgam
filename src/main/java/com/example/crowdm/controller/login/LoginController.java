package com.example.crowdm.controller.login;

import com.example.crowdm.dto.login.LoginRequest;
import com.example.crowdm.repository.login.LoginRepository;
import com.example.crowdm.service.login.LoginService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/login")
public class LoginController {

    private Logger logger = LoggerFactory.getLogger(this.getClass());
    private final LoginRepository loginRepository;
    private final LoginService loginService;

    @GetMapping("/loginPage")
    public String goLoginPage(HttpServletRequest request, HttpServletResponse response, Model model) {
        String errorMessage = request.getParameter("message");
        model.addAttribute("errorMessage", errorMessage);
        return "login/loginPage";
    }

    @PostMapping(value = "/loginAction")
    public Object loginAction(@RequestBody LoginRequest loginRequest, Model model, HttpServletRequest request, HttpServletResponse response) throws InvalidKeyException, UnsupportedEncodingException, NoSuchAlgorithmException, NoSuchPaddingException, InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException {
        logger.info("userID = {}", loginRequest.getId());
        logger.info("password = {}", loginRequest.getPw());
        Map<String, Object> result = loginService.updateLogin(loginRequest.getId(), loginRequest.getPw(), request);

        // 0715 이수민: 사용자 유형에 따라 다른 결과를 반환
        if ("user".equals(result.get("userType"))) {
            result.put("RESULT", "GO_USER_DASHBOARD");
            result.put("URL", "/dashboards");
        } else if ("admin".equals(result.get("userType"))) {
            result.put("RESULT", "GO_ADMIN_DASHBOARD");
            result.put("URL", "/admin");
        }
        return result;
    }
}