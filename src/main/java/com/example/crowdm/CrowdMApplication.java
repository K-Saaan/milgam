package com.example.crowdm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class CrowdMApplication {

    public static void main(String[] args) {
        SpringApplication.run(CrowdMApplication.class, args);
    }

}
