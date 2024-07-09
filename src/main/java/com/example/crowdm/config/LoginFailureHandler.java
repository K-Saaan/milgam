package com.example.crowdm.config;

import org.springframework.security.authentication.*;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URLEncoder;

@Component
public class LoginFailureHandler extends SimpleUrlAuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response
            , AuthenticationException exception) throws IOException, ServletException {
        String errorMessage;
        String errorCode;

        if (exception instanceof UsernameNotFoundException) {
            errorMessage = "계정이 존재하지 않습니다.";
            errorCode = "1";
        }
        else if (exception instanceof BadCredentialsException) {
            errorMessage = "아이디 또는 비밀번호가 맞지 않습니다.";
            errorCode = "2";
        }
        else if (exception instanceof InternalAuthenticationServiceException) {
            errorMessage = "내부적으로 발생한 시스템 문제로 인해 요청을 처리할 수 없습니다. 관리자에게 문의하세요.";
            errorCode = "3";
        }
        else if (exception instanceof AuthenticationCredentialsNotFoundException) {
            errorMessage = "인증 요청이 거부되었습니다. 관리자에게 문의하세요.";
            errorCode = "4";
        }
        else if (exception instanceof LockedException) {
            errorMessage = "잠겨있는 계정입니다. 관리자에게 문의하세요.";
            errorCode = "5";
        }
        else if (exception instanceof CredentialsExpiredException) {
            errorMessage = "만료된 계정입니다.";
            errorCode = "6";
        }
        else if (exception instanceof AuthenticationCredentialsNotFoundException) {
            errorMessage = "인증 요청이 거부되었습니다. 관리자에게 문의하세요.";
            errorCode = "7";
        }
        else {
            errorMessage = "알 수 없는 이유로 로그인에 실패하였습니다 관리자에게 문의하세요.";
            errorCode = "8";
        }
        errorCode = URLEncoder.encode(errorCode, "UTF-8");
        setDefaultFailureUrl("/login/loginPage?message=" + errorMessage);
        super.onAuthenticationFailure(request, response, exception);
    }
}
