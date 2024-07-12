package com.example.crowdm.controller.myq;

import com.example.crowdm.dto.faq.MyqList;
import com.example.crowdm.dto.faq.MyqListTwo;
import com.example.crowdm.dto.faq.RequestAddMyq;
import com.example.crowdm.entity.admin.MyqEntity;
import com.example.crowdm.entity.faq.FaqEntity;
import com.example.crowdm.repository.faq.FaqRepository;
import com.example.crowdm.service.faq.FaqService;
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

    //private final FaqRepository faqRepository;
    private final MyqService myqService;
    @GetMapping("/questionlist")
    public ResponseEntity<List<MyqListTwo>> myqList(HttpServletRequest request, HttpServletResponse response, Model model) {
        List<MyqListTwo> result= myqService.findAllQuestions(request);
        return ResponseEntity.ok(result);
    }

//    @PostMapping("/addquestion")
//    public ResponseEntity<MyqEntity> addQuestion(@RequestBody RequestAddMyq addmyq ) {
//        MyqEntity result=myqService.addquestion(addmyq.getQuestion_title(), addmyq.getQuestion());
//        return ResponseEntity.ok(result);
//    }
    @PostMapping("/addquestion")
    public ResponseEntity<MyqEntity> addQuestion(@RequestBody RequestAddMyq addmyq,
                                             HttpServletRequest request) {
        MyqEntity newQuestion = myqService.addquestion(addmyq.getQuestion_title(), addmyq.getQuestion(),request);
        return ResponseEntity.ok(newQuestion);
}
}
