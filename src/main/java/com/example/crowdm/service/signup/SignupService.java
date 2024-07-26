package com.example.crowdm.service.signup;

import com.example.crowdm.dto.signup.SignUpDto;
import com.example.crowdm.repository.signup.SignupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
public class SignupService {
    /**
     * 1. ClassName: signup
     * 2. FileName : EmailService.java
     * 3. Package  : com.example.crowdm.service
     * 4. Comment  : 회원 가입 시 Spring Security 를 사용하여 비밀번호를 암호화하여
     *               user 테이블에 저장한다.
     * 5. 작성자   : 유병민
     * 6. 작성일   : 2024. 07. 26
     */
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
    }


}
