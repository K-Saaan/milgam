package com.example.crowdm.service.signup;

import com.example.crowdm.dto.signup.EmailDto;
import com.example.crowdm.entity.user.EmailEntity;
import com.example.crowdm.repository.signup.EmailRepository;
import com.example.crowdm.service.mail.MailSender;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmailService {
    /**
     * 1. ClassName: signup
     * 2. FileName : EmailService.java
     * 3. Package  : com.example.crowdm.service
     * 4. Comment  : email을 전송하고 인증 번호 유효성을 검사함
     * 5. 작성자   : 유병민
     * 6. 작성일   : 2024. 07. 26
     */
    private final MailSender mailSender;
    private final EmailRepository emailRepository;

    @Transactional
    // 인증코드 이메일 발송
    public void sendEmail(EmailDto emailDto) {
        // String temppw = SimplePasswordGenerator.generateRandomString(12);
        emailRepository.save(emailDto.toEmailEntity());
        //System.out.println(emailDto.getEmail());
        mailSender.sendMailTemppw(emailDto.getEmail(), "Email Verification", emailDto.getCode());
    }

    // 코드 검증
    public Boolean verifyEmailCode(EmailDto emailDto) {
        // 이메일 코드를 기반으로 EmailEntity를 데이터베이스에서 조회합니다.
        EmailEntity emailEntity = emailRepository.findByCode(emailDto.getCode());

        // 조회된 EmailEntity가 없거나 인증 코드가 비어있으면 false를 반환합니다.
        if (emailEntity == null || emailEntity.getCode() == null || emailEntity.getCode().isEmpty()) {
            return false;
        }

        // 데이터베이스에 저장된 인증 코드와 EmailDto에서 가져온 인증 코드를 비교하여 결과를 반환합니다.
        return emailEntity.getCode().equals(emailDto.getCode());
    }
}
