package com.example.crowdm.service.myq;

import com.example.crowdm.dto.faq.MyqList;
import com.example.crowdm.dto.faq.MyqListTwo;
import com.example.crowdm.dto.user.PermissionList;
import com.example.crowdm.entity.admin.MyqEntity;
import com.example.crowdm.entity.faq.FaqEntity;
import com.example.crowdm.entity.user.UserEntity;
import com.example.crowdm.repository.admin.MyqRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MyqService {

    private final MyqRepository myqRepository;

    public List<MyqListTwo> findAllQuestions(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        Integer user_index = (Integer) session.getAttribute("userIndex");

        //Integer userIndex = 11;
        List<MyqEntity> myqlist = myqRepository.findByUser(user_index);
        List<MyqListTwo> answerList = new ArrayList<>();
        for (MyqEntity myq : myqlist) {
            Integer myq_index = myq.getMyq_index();
            String question_title = myq.getQuestion_title();
            String question = myq.getQuestion();
            //Integer user_index = user_index;
            Timestamp question_date = myq.getQuestion_date();
            Timestamp answer_date = myq.getAnswer_date();
            String answer = myq.getAnswer();
            String status;

            if (answer_date == null) {
                status = "대기";  // "Pending" in Korean
            } else {
                status = "완료"; // "Completed" in Korean
            }

            MyqListTwo myqList = new MyqListTwo(myq_index, question_title, question, user_index, question_date, answer_date, answer, status);
            answerList.add(myqList);
        }

        return answerList;
    }

        // 세션이 없거나 userId가 null인 경우 빈 리스트 반환
        //return Collections.emptyList();


    @Transactional
    public MyqEntity addquestion(String question_title, String question, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        Integer user_index = (Integer) session.getAttribute("userIndex");

                MyqEntity newQuestion = new MyqEntity();
                newQuestion.setUserId(user_index);
                newQuestion.setQuestionTitle(question_title);
                newQuestion.setQuestion(question);
                Timestamp date = new Timestamp(System.currentTimeMillis());
                newQuestion.setQuestionDate(date);
                newQuestion.setAnswer(null);
                newQuestion.setAnswerDate(null);
                newQuestion.setAdminIndex(null);
                return myqRepository.save(newQuestion);



        }
        // 세션이 없거나 userId가 null인 경우 예외를 던짐
        //throw new IllegalStateException("User not logged in or session expired");
    }


    //}

