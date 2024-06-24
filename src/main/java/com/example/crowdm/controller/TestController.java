package com.example.crowdm.controller;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api")
public class TestController {

    @GetMapping("/hello")
    public String test(HttpServletRequest request, HttpServletResponse response, Model model) {
        System.out.println("api/hello test : " + "hello, world");
        return "Hello, world!";
    }
}
