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

import javax.transaction.Transactional;

@Service
public class SignupService {

    private final SignupRepository signupRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public SignupService(SignupRepository signupRepository, PasswordEncoder passwordEncoder) {
        this.signupRepository = signupRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public void saveUser(SignUpDto signUpDto) {
        if (signUpDto.getPw() == null || signUpDto.getPw().isEmpty()) {
            throw new IllegalArgumentException("Password cannot be null or empty");
        }

        signUpDto.setPw(passwordEncoder.encode(signUpDto.getPw()));
        signupRepository.save(signUpDto.toUserEntity());
        //System.out.println(passwordEncoder.encode("sadmin"));
    }

}
