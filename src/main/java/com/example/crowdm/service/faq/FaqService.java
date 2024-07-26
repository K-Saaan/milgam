package com.example.crowdm.service.faq;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.example.crowdm.entity.faq.FaqEntity;
import com.example.crowdm.repository.faq.FaqRepository;

import java.util.List;
import java.util.Optional;
import javax.persistence.EntityNotFoundException;

@Service
@RequiredArgsConstructor
public class FaqService {

    private final FaqRepository faqRepository;

    /**
     * 1. MethodName: findAllQuestions
     * 2. ClassName : FaqService
     * 3. Comment   : FAQ 목록
     * 4. 작성자    : boyeong
     * 5. 작성일    : 2024. 07. 03
     **/
    public List<FaqEntity> findAllQuestions() {

        List<FaqEntity> faqList = faqRepository.findAll();

        return faqList;
    }
    /**
     * 1. MethodName: findAnswer
     * 2. ClassName : FaqService
     * 3. Comment   : FAQ 상세보기
     * 4. 작성자    : boyeong
     * 5. 작성일    : 2024. 07. 03
     **/
    public String findAnswer(int id) {
        Optional<FaqEntity> optionalFaq = faqRepository.findById(id);
        if (optionalFaq.isPresent()) {
            return optionalFaq.get().getAnswer();
        } else {
            throw new EntityNotFoundException("FAQ with id " + id + " not found");
        }
    }
}
