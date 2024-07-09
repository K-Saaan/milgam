package com.example.crowdm.controller.faq;

import com.example.crowdm.entity.faq.FaqEntity;
import com.example.crowdm.repository.faq.FaqRepository;
import com.example.crowdm.service.faq.FaqService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/faq")
public class FaqController {
    private final FaqRepository faqRepository;
    private final FaqService faqService;

    /**
     * 1. MethodName: question
     * 2. ClassName : FaqController
     * 3. Comment   : faq 질문-답변 목록 출력
     * 4. 작성자    : boyeong
     * 5. 작성일    : 2024. 07. 09
     **/
    @GetMapping("/question")
    public ResponseEntity<List<FaqEntity>> qlist(HttpServletRequest request, HttpServletResponse response, Model model) {
        System.out.println("faq select  : ");
        List<FaqEntity> faqList = faqService.findAllQuestions();
        System.out.println("faqList : " + faqList);

        // 모델에 추가하여 View에서 접근 가능하도록 설정 (필요 시)
        model.addAttribute("faqList", faqList);

        return ResponseEntity.ok(faqList);
    }


}
