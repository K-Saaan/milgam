package com.example.crowdm.controller.admin;
import com.example.crowdm.dto.user.PermissionList;
import com.example.crowdm.entity.admin.MyqEntity;
import com.example.crowdm.repository.admin.AdminRepository;
import com.example.crowdm.service.admin.AdminService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import java.util.HashMap;


@Controller
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    private final AdminRepository adminRepository;
    private final AdminService adminService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @GetMapping("/permission")
    public ResponseEntity<String> permission(@RequestParam("user_index") int user_index) {
        logger.debug("permission start >>>>>>>>>>>>>>>>>>>>>>>>> id : {}", user_index);

        int updateResult = adminService.permissionUpdateUser(user_index);
        if (updateResult == 1) {
            return ResponseEntity.ok("OK");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating permission");
        }
    }

    @GetMapping("/permissionlist")
    public ResponseEntity<List<PermissionList>> permissionList() {
        List<PermissionList> result = adminService.permissionList();
        return ResponseEntity.ok(result);
    }

    @GetMapping("/questionlist")
    public ResponseEntity<List<MyqEntity>> myqList() {
        List<MyqEntity> result = adminService.myqList();
        return ResponseEntity.ok(result);
    }




}





