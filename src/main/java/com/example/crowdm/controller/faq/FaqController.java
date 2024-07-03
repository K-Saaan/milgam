package com.example.crowdm.controller.faq;

import com.example.crowdm.repository.faq.FaqRepository;
import com.example.crowdm.service.faq.FaqService;
import lombok.RequiredArgsConstructor;
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

    @GetMapping("/question")
    public String qlist(HttpServletRequest request, HttpServletResponse response, Model model) {
        System.out.println("faq select  : ");
        List<String> faqList = faqService.findAllQuestions();
        System.out.println("faqList : " + faqList);

        // 모델에 추가하여 View에서 접근 가능하도록 설정 (필요 시)
        model.addAttribute("faqList", faqList);

        return "faqList";  // 실제 뷰 이름으로 변경 필요
    }

    @GetMapping("/answer")
    public String answer(@RequestParam("id") int id, Model model) {
        System.out.println("faq select  : ");

        // findAnswer 메서드 호출
        String an = faqService.findAnswer(id);

        System.out.println("answer : " + an);

        // 모델에 추가하여 View에서 접근 가능하도록 설정 (필요 시)
        model.addAttribute("answer", an);

        return "faqAnswer";  // 실제 뷰 이름으로 변경 필요
    }
}
