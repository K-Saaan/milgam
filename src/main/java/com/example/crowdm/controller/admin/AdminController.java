package com.example.crowdm.controller.admin;
import com.example.crowdm.dto.faq.Answerq;
import com.example.crowdm.dto.faq.MyqList;
import com.example.crowdm.dto.faq.Requestq;
import com.example.crowdm.dto.faq.UnlockList;
import com.example.crowdm.dto.user.PermissionList;
import com.example.crowdm.dto.user.UserDetail;
import com.example.crowdm.entity.admin.MyqEntity;
import com.example.crowdm.entity.user.UserEntity;
import com.example.crowdm.repository.admin.AdminRepository;
import com.example.crowdm.repository.admin.MyqRepository;
import com.example.crowdm.service.admin.AdminService;
import com.fasterxml.jackson.databind.ObjectMapper;
//import config.SecurityConfig;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Import;
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

    private final AdminService adminService;

    private final MyqRepository myqRepository;

    private final AdminRepository adminRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();



    /**
     * 1. MethodName: permission
     * 2. ClassName : AdminController
     * 3. Comment   : 회원가입 승인
     * 4. 작성자    : boyeong
     * 5. 작성일    : 2024. 07. 09
     **/

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


    @GetMapping("/deny")
    public ResponseEntity<String> deny(@RequestParam("user_index") int user_index) {
        int updateResult=adminService.denyUpdateUser(user_index);
        if (updateResult == 1) {
            return ResponseEntity.ok("OK");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating permission");
        }
    }
/*
    @GetMapping("/userdetail")
    public ResponseEntity<List<UserDetail>> userdetail(@RequestParam("user_index") int user_index) {
        List<UserDetail> result=adminService.userdetail(user_index);
        return ResponseEntity.ok(result);

    }*/
    /**
     * 1. MethodName: userlist
     * 2. ClassName : AdminController
     * 3. Comment   : 회원가입한 유저들 목록
     * 4. 작성자    : boyeong
     * 5. 작성일    : 2024. 07. 09
     **/
    @GetMapping("/usrelist")
    public ResponseEntity<List<PermissionList>> permissionList() {
        List<PermissionList> result = adminService.permissionList();
        return ResponseEntity.ok(result);
    }


    /**
     * 1. MethodName: questionlist
     * 2. ClassName : AdminController
     * 3. Comment   : myq 질문 목록
     * 4. 작성자    : boyeong
     * 5. 작성일    : 2024. 07. 09
     **/
    @GetMapping("/questionlist")
    public ResponseEntity<List<MyqList>> myqList() {
        List<MyqList> result = adminService.myqList();
        return ResponseEntity.ok(result);
    }


    /**
     * 1. MethodName: answer
     * 2. ClassName : AdminController
     * 3. Comment   : 질문에 응답하기
     * 4. 작성자    : boyeong
     * 5. 작성일    : 2024. 07. 09
     **/

    @PostMapping("/answer")
    public ResponseEntity<Answerq> answer(@RequestBody Requestq answerRequest) {
        int result = adminService.answering(answerRequest.getMyq_index(), answerRequest.getAnswer());

        System.out.println(answerRequest.getMyq_index());
        // Fetch the updated entity from the repository
        MyqEntity myqEntity = myqRepository.findById(answerRequest.getMyq_index()).orElse(null);
        if (myqEntity == null) {
            return ResponseEntity.status(404).body(null); // or handle error as needed
        }

        // Map MyqEntity to Answerq DTO
        Answerq answerResponse = new Answerq(
                myqEntity.getMyq_index(),
                myqEntity.getQuestion_title(),
                myqEntity.getUser_index(),
                myqEntity.getQuestion_date(),
                myqEntity.getAnswer_date(),
                myqEntity.getAnswer(),
                result == 1 ? "Answered" : "Failed"
        );

        return ResponseEntity.ok(answerResponse);
    }

    /**
     * 1. MethodName: unlock
     * 2. ClassName : AdminController
     * 3. Comment   : 5회 비번 틀려서 잠긴 계정에 대해, 잠금 풀어줌
     * 4. 작성자    : boyeong
     * 5. 작성일    : 2024. 07. 09
     **/
    @GetMapping("/unlock")
    public ResponseEntity<?> unlock() {
        List<UnlockList> result = adminService.unlock();
        if (result == null || result.isEmpty()) {
            // Return an error response if no data or an unexpected error occurs
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("No data found or unexpected error occurred");
        } else {
            // Return the list of unlocked users
            return ResponseEntity.ok(result);
        }
    }


    }









