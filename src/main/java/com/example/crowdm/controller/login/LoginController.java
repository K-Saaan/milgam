package com.example.crowdm.controller.login;

import com.example.crowdm.dto.login.LoginRequest;
import com.example.crowdm.dto.user.Profile;
import com.example.crowdm.repository.login.LoginRepository;
import com.example.crowdm.service.login.LoginService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
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

@RestController
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

    @PostMapping(value = "/loginAction")
    public  Object loginAction(@RequestBody LoginRequest loginRequest, Model model, HttpServletRequest request, HttpServletResponse	response) throws InvalidKeyException, UnsupportedEncodingException, NoSuchAlgorithmException, NoSuchPaddingException, InvalidAlgorithmParameterException, IllegalBlockSizeException, BadPaddingException {
        logger.info("userID = {}", loginRequest.getId());
        logger.info("password = {}", loginRequest.getPw());
        return loginService.updateLogin(loginRequest.getId(), loginRequest.getPw(), request);
    }


    /**
     * 1. MethodName: profile
     * 2. ClassName : LoginController
     * 3. Comment   : 내 페이지 프로필
     * 4. 작성자    : boyeong
     * 5. 작성일    : 2024. 07. 15
     **/
    @GetMapping("/profile")
    public ResponseEntity<Profile> goProfile(HttpServletRequest request, HttpServletResponse response) {
        Profile result=loginService.getProfile(request);
        return ResponseEntity.ok(result);

    }

    /**
     * 1. MethodName: updateevent
     * 2. ClassName : LoginController
     * 3. Comment   : 이벤트 선택했을때, 선택된 이벤트로 업데이트 시키기
     * 4. 작성자    : boyeong
     * 5. 작성일    : 2024. 07. 15**/
    @GetMapping("updateevent")
    public ResponseEntity<String> updateEvent(@RequestParam("event_index") int event_index, HttpServletRequest request) {
        String result=loginService.UpdateEventAtProfile(event_index, request);
        return ResponseEntity.ok(result);
    }
}
