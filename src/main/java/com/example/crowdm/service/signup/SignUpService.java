package com.example.crowdm.service.signup;

import com.example.crowdm.dto.user.UserDTO;
import com.example.crowdm.repository.signup.SignUpRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class SignUpService {
    private SignUpRepository signUpRepository;
    private PasswordEncoder passwordEncoder;

    public String saveUser(UserDTO userDTO) {
        userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        signUpRepository.save(userDTO.toEntity());
        return userDTO.getId();
    }
}
