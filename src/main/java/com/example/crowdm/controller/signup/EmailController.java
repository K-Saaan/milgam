package com.example.crowdm.controller.signup;

import com.example.crowdm.dto.signup.EmailDto;
import com.example.crowdm.service.signup.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor

public class EmailController {
    /**
     * 1. ClassName: signup
     * 2. FileName : EmailController.java
     * 3. Package  : com.example.crowdm.controller
     * 4. Comment  : 회원가입 이메일 인증 API 컨트롤러
     * 5. 작성자   : 유병민
     * 6. 작성일   : 2024. 07. 26
     */
    private final EmailService emailService;
    static int count = 0;
    // 인증코드 메일 발송
    @PostMapping("/signup/email")
    public ResponseEntity<String> mailSend(@RequestBody EmailDto emailDto) {
        System.out.println(emailDto);
        if (emailDto.getEmail() == null || emailDto.getEmail().trim().isEmpty()) {
            return new ResponseEntity<>("Email cannot be null or empty", HttpStatus.BAD_REQUEST);
        }

        try {
            if(count == 0){
                emailService.sendEmail(emailDto);
            }
            count = 0;
            return new ResponseEntity<>("Verification email sent successfully", HttpStatus.OK);
        }  catch (Exception e) {
            count++;
            log.error("An unexpected error occurred", e);
            return new ResponseEntity<>("An unexpected error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 인증코드 인증
    @PostMapping("/signup/verify")
    public ResponseEntity<String> verify(@RequestBody EmailDto emailDto) {
        try {
            boolean isVerified = emailService.verifyEmailCode(emailDto);
            if (isVerified) {
                return ResponseEntity.ok("Email code verified successfully");
            } else {
                return ResponseEntity.badRequest().body("Invalid email code");
            }
        } catch (Exception e) {
            log.error("An unexpected error occurred", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }
}
