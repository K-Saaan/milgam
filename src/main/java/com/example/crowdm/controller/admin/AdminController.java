package com.example.crowdm.controller.admin;
import com.example.crowdm.dto.faq.Answerq;
import com.example.crowdm.dto.faq.MyqList;
import com.example.crowdm.dto.faq.Requestq;
import com.example.crowdm.dto.faq.UnlockList;
import com.example.crowdm.dto.user.PermissionList;
import com.example.crowdm.entity.admin.MyqEntity;
import com.example.crowdm.entity.user.UserEntity;
import com.example.crowdm.repository.admin.AdminRepository;
import com.example.crowdm.repository.admin.MyqRepository;
import com.example.crowdm.service.admin.AdminService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
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

@RestController
@Controller
@RequiredArgsConstructor
@RequestMapping("/admin")
public class AdminController {

    private Logger logger = LoggerFactory.getLogger(this.getClass());
    @Autowired
    private AdminService adminService;


    @Autowired
    private MyqRepository myqRepository;

    private final AdminRepository adminRepository;

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

//    @GetMapping("/questionlist")
//    public ResponseEntity<List<MyqList>> myqList() {
//        List<MyqEntity> result = adminService.myqList();
//        return ResponseEntity.ok(result);
//    }

    /*@PostMapping("/answer")
    public ResponseEntity<String> answer(@RequestBody Requestq answerRequest) {
        int result = adminService.answering(answerRequest.getMyq_index(), answerRequest.getAnswer());
        return ResponseEntity.ok("ok");
    }*/
//    @PostMapping("/answer")
//    public ResponseEntity<Answerq> answer(@RequestBody Requestq answerRequest) {
//        int result = adminService.answering(answerRequest.getMyq_index(), answerRequest.getAnswer());
//
//        System.out.println(answerRequest.getMyq_index());
//        // Fetch the updated entity from the repository
//        MyqEntity myqEntity = myqRepository.findById(answerRequest.getMyq_index()).orElse(null);
//        if (myqEntity == null) {
//            return ResponseEntity.status(404).body(null); // or handle error as needed
//        }
//
//        // Map MyqEntity to Answerq DTO
//        Answerq answerResponse = new Answerq(
//                myqEntity.getMyq_index(),
//                myqEntity.getQuestion_title(),
//                myqEntity.getUser_index(),
//                myqEntity.getQuestion_date(),
//                myqEntity.getAnswer_date(),
//                myqEntity.getAnswer(),
//                result == 1 ? "Answered" : "Failed"
//        );
//
//        return ResponseEntity.ok(answerResponse);
//    }

//    @GetMapping("/unlock")
//    public ResponseEntity<?> unlock() {
//        List<UnlockList> result = adminService.unlock();
//        if (result == null || result.isEmpty()) {
//            // Return an error response if no data or an unexpected error occurs
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("No data found or unexpected error occurred");
//        } else {
//            // Return the list of unlocked users
//            return ResponseEntity.ok(result);
//        }
//    }

    @PostMapping("/post-endpoint")
    public ResponseEntity<String> handlePostRequest(@RequestBody Requestq requestDto) {
        logger.info("Received POST request with body: {}", requestDto);
        return ResponseEntity.ok("Request received");
    }

    }









