package config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
//import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception { // 특정 Http 요청에 대해 웹 기반 보안 구성. 인증/인가 및 로그아웃을 설정
        http.csrf().disable()
                .authorizeRequests() //인증, 인가가 필요한 URL 지정
                .antMatchers("/static/css/**","/static/js/**","/static/image/**","/static/font/**").permitAll()
                .antMatchers("/home/home","/login/loginPage","/login/loginAction","/login/registerPage","/login/register","/hello").permitAll()
                .anyRequest().authenticated() // 그 외 모든 url은 로그인 필요
                .and()
                    .formLogin() // form login 방식 적용
                        .usernameParameter("username")
                        .passwordParameter("password")
                        .loginPage("/login/loginPage")
                        .loginProcessingUrl("/login/loginAction") // 로그인 처리 URL 지정
                        .permitAll()
                        .successHandler(LoginSuccessHandler())
                        .failureHandler(LoginFailureHandler())
                .and()
                    .logout() // 로그아웃에 대한 정보
                        .logoutUrl("/login/logout") // 로그아웃 처리 url
                        .logoutSuccessUrl("/home/home") // 로그아웃 성공 후 이동 페이지
                        .deleteCookies("JSESSIONID")
                        .addLogoutHandler(new LogoutHandler() {
                            @Override
                            public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
                                HttpSession session = request.getSession();
                                session.invalidate();
                            }
                        })
                        .logoutSuccessHandler(new LogoutSuccessHandler() {
                            @Override
                            public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
                                response.sendRedirect("/home/home");
                            }
                        })
                .and()
                    .sessionManagement() // 세션 관리 기능 동작
                    .maximumSessions(1) // 최대 세션수 지정
                    .maxSessionsPreventsLogin(true); // 동시 로그인 차단
        return http.build();
    }

    @Bean
    public LoginSuccessHandler LoginSuccessHandler() {
        return new LoginSuccessHandler();
    }
    @Bean
    public LoginFailureHandler LoginFailureHandler() {
        return new LoginFailureHandler();
    }

}
