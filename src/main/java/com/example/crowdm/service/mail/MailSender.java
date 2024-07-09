package com.example.crowdm.service.mail;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class MailSender {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String from;

    public void sendMail(String to){
        logger.info("MailSender Start >>>>>>>>>>>>>>>>>>>>>>>> ");
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setFrom(from);
            message.setSubject( "Hello World!" );
            message.setText( "Hello World!" );
            mailSender.send(message);
            logger.info("MailSender Success >>>>>>>>>>>>>>>>>>>>>>>> ");
        } catch (MailException e) {
            logger.info("MailSender Fail >>>>>>>>>>>>>>>>>>>>>>>> ");
            logger.error("MailException : {}", e.getMessage());
        }
    }
}