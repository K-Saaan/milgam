package com.example.crowdm.dto.faq;

import java.sql.Timestamp;
/**
 * 1. MethodName: Answerq
 * 2. ClassName : Answerq
 * 3. Comment   : 1:1응답 반환 형식 dto
 * 4. 작성자    : boyeong
 * 5. 작성일    : 2024. 07. 4
 **/
public class Answerq {

    private Integer myq_index;
    private String question_title;
    private Integer user_index;
    private Timestamp question_date;
    private Timestamp answer_date;
    private String answer;
    private String status;
    // 추가된 필드

    public Answerq() {}

    public Answerq(Integer myq_index, String question_title, Integer user_index, Timestamp question_date, Timestamp answer_date, String answer, String status) {
        this.myq_index = myq_index;
        this.question_title = question_title;
        this.user_index = user_index;
        this.question_date = question_date;
        this.answer_date = answer_date;
        this.answer = answer;
        this.status = status;

    }

    // getters and setters
    public Integer getMyqIndex() {
        return myq_index;
    }

    public void setMyqIndex(Integer myq_index) {
        this.myq_index = myq_index;
    }

    public String getQuestionTitle() {
        return question_title;
    }

    public void setQuestionTitle(String question_title) {
        this.question_title = question_title;
    }

    public Integer getUserIndex() {
        return user_index;
    }

    public void setUserIndex(Integer user_index) {
        this.user_index = user_index;
    }

    public Timestamp getQuestionDate() {
        return question_date;
    }

    public void setQuestionDate(Timestamp question_date) {
        this.question_date = question_date;
    }

    public Timestamp getAnswerDate() {
        return answer_date;
    }

    public void setAnswerDate(Timestamp answer_date) {
        this.answer_date = answer_date;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }


}
