package com.example.crowdm.service.signup;

import com.example.crowdm.dto.signup.EmailDto;
import com.example.crowdm.entity.user.EmailEntity;
import com.example.crowdm.repository.signup.EmailRepository;
import com.example.crowdm.service.admin.SimplePasswordGenerator;
import com.example.crowdm.service.mail.MailSender;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {

    private final MailSender mailSender;
    private final EmailRepository emailRepository;
    // 인증코드 이메일 발송
    public void sendEmail(EmailDto emailDto) {
       // String temppw = SimplePasswordGenerator.generateRandomString(12);
        emailRepository.save(emailDto.toEmailEntity());
        mailSender.sendMailTemppw(emailDto.getEmail(), "temppw", emailDto.getCode());
    }

    // 코드 검증
    public Boolean verifyEmailCode(String email, String code) {
        EmailEntity emailEntity = emailRepository.findByEmail(email);

        if (emailEntity == null || emailEntity.getCode() == null || emailEntity.getCode().isEmpty()) {
            return false;
        }
        return emailEntity.getCode().equals(code);
    }
}
