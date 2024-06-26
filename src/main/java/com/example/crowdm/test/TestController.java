package com.example.crowdm.test;

import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Value;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class TestController {

    @Value("${key}")
    private String username;

    @GetMapping("/hello")
    public String test(HttpServletRequest request, HttpServletResponse response, Model model) {
        System.out.println("api/hello test : " + "hello, world");
        System.out.println("username : " + username);

        return "Hello, world!";
    }
}
