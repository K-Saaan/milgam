package com.example.crowdm.controller.signup;

import com.example.crowdm.dto.user.UserDTO;
import com.example.crowdm.service.signup.SignUpService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class SignUpCotroller {

    private final SignUpService signUpService;

    @PostMapping("/login/signup")
    public String saveUser(UserDTO userDTO) {
        return signUpService.saveUser(userDTO);
    }
}
