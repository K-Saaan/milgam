package com.example.crowdm.test;

import com.example.crowdm.service.mail.MailSender;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Value;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/test")
public class TestController {

    private final MailSender mailSender;

    @GetMapping("/hello")
    public String test(HttpServletRequest request, HttpServletResponse response, Model model) {
        System.out.println("test/hello test : " + "hello, world");

        return "Hello, world!";
    }

    @GetMapping("/mail")
    public String mailTest(@RequestParam String to, Model model) {
        System.out.println("test/mail test : ");
        mailSender.sendMail(to);
        return "mail send!";
    }

    @PostMapping("/post")
    public String postTest(@RequestParam String test, Model model) {
        System.out.println("test/post Test : ");
        return test;
    }

    @GetMapping("/res")
    public ResponseEntity resTest(@RequestParam String test, Model model) {
        System.out.println("test/post Test : ");
        return ResponseEntity.status(HttpStatus.OK).body("Success");
    }
}
