package com.example.crowdm.service.signup;

import com.example.crowdm.dto.user.UserDTO;
import com.example.crowdm.repository.signup.SignUpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class SignUpService {
    private SignUpRepository signUpRepository;
    private PasswordEncoder passwordEncoder;


    public String saveUser(UserDTO userDTO) {
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        signUpRepository.save(userDTO.toEntity());
        // 날짜 바꾸기(시작, 끝)

        return userDTO.getId();
    }
}
