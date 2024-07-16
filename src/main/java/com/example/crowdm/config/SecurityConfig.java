package com.example.crowdm.config;

import org.hibernate.SessionEventListener;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;
import org.springframework.security.web.session.SessionManagementFilter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
//import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    public void configure(HttpSecurity http) throws Exception { // 특정 Http 요청에 대해 웹 기반 보안 구성. 인증/인가 및 로그아웃을 설정
        http
                .csrf().disable() //csrf토큰 비활성화(테스트시 걸어두는게 좋음)
                .authorizeRequests()
                .antMatchers("/login/loginPage", "/login/loginAction", "/**", "/signup", "/signup/email", "/signup/tempw").permitAll()
                .anyRequest().authenticated()
                .and()
                .logout()
                .permitAll()
                .and();
        http.sessionManagement() //중복로그인 제어
                .maximumSessions(1) //세션 최대 허용 수
                .maxSessionsPreventsLogin(false); // false: 중복 로그인하면 이전 로그인이 풀림
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
