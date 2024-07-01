package com.example.crowdm.controller.Dashboard;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DashboardController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello World";
    }
}
