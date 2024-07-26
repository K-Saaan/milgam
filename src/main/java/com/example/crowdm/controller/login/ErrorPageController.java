package com.example.crowdm.controller.login;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


/**
 * 1. ClassName : ErrorPageController
 * 2. Comment   : 에러 화면으로 이동
 * 3. 작성자    : san
 * 4. 작성일    : 2024. 07. 09
 **/

@Slf4j
@Controller
@RequestMapping("/error")
public class ErrorPageController {


    @RequestMapping("/400")
    public String error400(HttpServletRequest request, HttpServletResponse response) {
        log.info("errorPage 400");
        printErrorInfo(request);
        return "error/400";
    }

    @RequestMapping("/404")
    public String error404(HttpServletRequest request, HttpServletResponse response) {
        log.info("errorPage 404");
        printErrorInfo(request);
        return "error/404";
    }

    @RequestMapping("/500")
    public String error500(HttpServletRequest request, HttpServletResponse response) {
        log.info("errorPage 500");
        printErrorInfo(request);
        return "error/500";
    }

    private void printErrorInfo(HttpServletRequest request) {
        log.info("dispatchTypes= {}", request.getDispatcherType());
    }
}
