package com.example.crowdm.service.admin;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;

import java.util.Properties;


@Service
@RequiredArgsConstructor
public class EmailService {

    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);
    private final JavaMailSender javaMailSender;

    public void sendTemporaryPassword(String userEmail, String temporaryPassword) {
        logger.info("Start sendTemporaryPassword >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> ");
        JavaMailSenderImpl mailSender =  new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);
        mailSender.setUsername(userEmail);
        mailSender.setPassword(temporaryPassword);
        Properties props = mailSender.getJavaMailProperties();

        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo("pby0204@gmail.com");
        mailMessage.setFrom("aivleteam12@gmail.com");
        mailMessage.setSubject("Temporary Password");
        mailMessage.setText("Your temporary password is: 1234");
        javaMailSender.send(mailMessage);


        /*System.out.println("start>>>>>>>>>>>>>>>>>>>>> ");
        try {
            System.out.println("try>>>>>>>>>>>>>>>>>>>>> ");
            SimpleMailMessage mailMessage = new SimpleMailMessage();
            mailMessage.setTo("pby0204@gmail.com");
            mailMessage.setFrom("aivleteam12@gmail.com");
            mailMessage.setSubject("Temporary Password");
//            mailMessage.setText("Your temporary password is: " + temporaryPassword);
            mailMessage.setText("Your temporary password is: 1234");

            javaMailSender.send(mailMessage);
            logger.info("Email sent successfully to {}", userEmail);
        } catch (Exception e) {
            System.out.println("catch>>>>>>>>>>>>>>>>>>>>> ");
            logger.error("Failed to send email to {}: {}", userEmail, e.getMessage());
        }*/
    }
}
