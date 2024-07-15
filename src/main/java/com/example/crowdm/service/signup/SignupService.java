package com.example.crowdm.service.signup;

import com.example.crowdm.dto.faq.UnlockList;
import com.example.crowdm.dto.signup.SignUpDto;
import com.example.crowdm.entity.user.UserEntity;
import com.example.crowdm.repository.signup.SignupRepository;
import com.example.crowdm.service.admin.SimplePasswordGenerator;
import com.example.crowdm.service.mail.MailSender;
import com.sun.tools.jconsole.JConsoleContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class SignupService {

    private final SignupRepository signupRepository;
    private final PasswordEncoder passwordEncoder;
    static MailSender mailSender;

    @Autowired
    public SignupService(SignupRepository signupRepository, PasswordEncoder passwordEncoder) {
        this.signupRepository = signupRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public String saveUser(SignUpDto signUpDto) {
        if (signUpDto.getPw() == null || signUpDto.getPw().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null or empty");
        }

        signUpDto.setPw(passwordEncoder.encode(signUpDto.getPw()));
        signupRepository.save(signUpDto.toUserEntity());
        return signUpDto.getId();
    }

//    public boolean sendVerificationCode(String verificationCode) {
//        boolean result = false;
//        if (verificationCode == null || verificationCode.isEmpty()) {
//            return result;
//        }
//
//        try {
//            String temppw = SimplePasswordGenerator.generateRandomString(12);
//            // DB에 임시번호 저장
//            UserEntity userEntity = signupRepository.findByEmail(verificationCode);
//
//            if(userEntity != null) {
//
//            }
//
//            SignUpDto signUpDto = new SignUpDto();
//            signUpDto.setTemppw(temppw);
//
//            System.out.println("Start emailService.sendTemporaryPassword >>>>>>>>>>>>>>>>>>>>> ");
//            // 이메일 발송
//            mailSender.sendMailTemppw(verificationCode, "temppw", temppw);
//            result = true;
//            System.out.println("Start emailService.sendTemporaryPassword >>>>>>>>>>>>>>>>>>>>> ");
//        } catch (Exception e) {
//            System.out.println("Error");
//        }
//        return result;
//    }
//
//    public static boolean TempPwIsValid(String temppw) {
//        boolean result = false;
//        if (temppw == null || temppw.isEmpty()) {
//            return result;
//        }
//
//        try {
//            SignUpDto signUpDto = new SignUpDto();
//            String real = signUpDto.getTemppw();
//
//            if(real.equals(temppw)) {
//                result = true;
//            }
//            System.out.println("Success!");
//
//        }catch (Exception e) {
//            System.out.println("Error");
//        }
//        return result;
//    }
}
