package com.example.crowdm.controller.signup;

import com.example.crowdm.dto.signup.EmailDto;
import com.example.crowdm.service.signup.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
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
        System.out.println(emailDto);
        if (emailDto.getEmail() == null || emailDto.getEmail().trim().isEmpty()) {
            return new ResponseEntity<>("Email cannot be null or empty", HttpStatus.BAD_REQUEST);
        }

        try {
            emailService.sendEmail(emailDto);
            System.out.println("1");
            return new ResponseEntity<>("Verification email sent successfully", HttpStatus.OK);
        }  catch (Exception e) {
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
