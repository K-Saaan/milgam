package com.example.crowdm.service.admin;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);
    private final JavaMailSender javaMailSender;

    public void sendTemporaryPassword(String userEmail, String temporaryPassword) {
        try {
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo(userEmail);
            mailMessage.setFrom("aivleteam12@gmail.com");
            mailMessage.setSubject("Temporary Password");
            mailMessage.setText("Your temporary password is: " + temporaryPassword);

            javaMailSender.send(mailMessage);
            logger.info("Email sent successfully to {}", userEmail);
        } catch (Exception e) {
            logger.error("Failed to send email to {}: {}", userEmail, e.getMessage());
        }
    }
}
