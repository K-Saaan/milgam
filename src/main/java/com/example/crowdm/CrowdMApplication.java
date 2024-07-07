package com.example.crowdm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;

//@EnableJpaRepositories(basePackages = {"com.example.crowdm.repository.*"})
@SpringBootApplication
public class CrowdMApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(CrowdMApplication.class, args);
    }

}
