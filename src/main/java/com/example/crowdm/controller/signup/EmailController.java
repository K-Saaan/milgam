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

import javax.mail.MessagingException;

@Slf4j
@RestController
@RequiredArgsConstructor

public class EmailController {
    private final EmailService emailService;

    // 인증코드 메일 발송
    @PostMapping("/signup/email")
    public ResponseEntity<String> mailSend(@RequestBody EmailDto emailDto) {
        log.info("EmailController.mailSend()");

        if (emailDto.getEmail() == null || emailDto.getEmail().trim().isEmpty()) {
            return new ResponseEntity<>("Email cannot be null or empty", HttpStatus.BAD_REQUEST);
        }

        try {
            emailService.sendEmail(emailDto);
            return new ResponseEntity<>("Verification email sent successfully", HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            log.error("Failed to send verification email", e);
            return new ResponseEntity<>("Failed to send verification email", HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            log.error("An unexpected error occurred", e);
            return new ResponseEntity<>("An unexpected error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 인증코드 인증
    @PostMapping("/signup/verify")
    public String verify(@RequestBody EmailDto emailDto) {
        log.info("EmailController.verify()");
        boolean isVerify = emailService.verifyEmailCode(emailDto.getEmail(), emailDto.getCode());
        return isVerify ? "인증이 완료되었습니다." : "인증 실패하셨습니다.";
    }
}
