package com.example.crowdm.service.faq;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.example.crowdm.entity.faq.FaqEntity;
import com.example.crowdm.repository.faq.FaqRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import javax.persistence.EntityNotFoundException;

@Service
@RequiredArgsConstructor
public class FaqService {

    private final FaqRepository faqRepository;

    public List<String> findAllQuestions() {
        List<String> questions = new ArrayList<>();
        List<FaqEntity> faqList = faqRepository.findAll();
        faqList.forEach(e -> questions.add(e.getAnswer()));
        return questions;
    }

    public String findAnswer(int id) {
        Optional<FaqEntity> optionalFaq = faqRepository.findById(id);
        if (optionalFaq.isPresent()) {
            return optionalFaq.get().getAnswer();
        } else {
            throw new EntityNotFoundException("FAQ with id " + id + " not found");
        }
    }
}
