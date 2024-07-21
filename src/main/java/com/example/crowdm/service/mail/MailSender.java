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

    public void sendMailTemppw(String to,String subject,  String text){
        logger.info("MailSender Start >>>>>>>>>>>>>>>>>>>>>>>> ");
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            String emailText = "안녕하세요. Milgam입니다.\n\n"
                    + "Milgam에 가입해주셔서 감사합니다!\n"
                    + "아래 인증번호를 사이트에서 인증해주세요:\n\n"
                    + text+"\n"
                    + "이메일 인증을 완료하시면, Milgam의 모든 서비스를 이용하실 수 있습니다.\n\n"
                    + "감사합니다.\n"
                    + "Milgam 팀 드림";
            message.setTo(to);
            message.setFrom(from);
            message.setSubject(subject);
            message.setText(emailText);
            mailSender.send(message);
            logger.info("MailSender Success >>>>>>>>>>>>>>>>>>>>>>>> ");
        } catch (MailException e) {
            logger.info("MailSender Fail >>>>>>>>>>>>>>>>>>>>>>>> ");
            logger.error("MailException : {}", e.getMessage());
        }
    }
}