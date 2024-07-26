package com.example.crowdm.controller.myq;


import com.example.crowdm.dto.faq.MyqListTwo;
import com.example.crowdm.dto.faq.RequestAddMyq;
import com.example.crowdm.entity.admin.MyqEntity;

import com.example.crowdm.service.myq.MyqService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/myq")
public class MyqController {

    /**
     * 1. MethodName: questionlist
     * 2. ClassName : MyqController
     * 3. Comment   : 1:1문의 질문 목록
     * 4. 작성자    : boyeong
     * 5. 작성일    : 2024. 07. 12
     **/
    private final MyqService myqService;
    @GetMapping("/questionlist")
    public ResponseEntity<List<MyqListTwo>> myqList(HttpServletRequest request, HttpServletResponse response, Model model) {
        List<MyqListTwo> result= myqService.findAllQuestions(request);
        return ResponseEntity.ok(result);
    }

    /**
     * 1. MethodName: addquestion
     * 2. ClassName : MyqController
     * 3. Comment   : 1:1 문의 등록
     * 4. 작성자    : boyeong
     * 5. 작성일    : 2024. 07. 12
     **/
    @PostMapping("/addquestion")
    public ResponseEntity<MyqEntity> addQuestion(@RequestBody RequestAddMyq addmyq,
                                             HttpServletRequest request) {
        MyqEntity newQuestion = myqService.addquestion(addmyq.getQuestion_title(), addmyq.getQuestion(),request);
        return ResponseEntity.ok(newQuestion);
}
}
