package com.example.crowdm.dto.faq;

import java.sql.Timestamp;


public class MyqListTwo {
    private Integer myq_index;
    private String question_title;
    private String question;
    private Integer user_index;
    private Timestamp question_date;
    private Timestamp answer_date;
    private String answer;
    private String status;


    public MyqListTwo() {}
    public MyqListTwo(Integer myq_index, String question_title, String question, Integer user_index, Timestamp question_date, Timestamp answer_date,  String answer, String status) {
        this.myq_index=myq_index;
        this.question_title=question_title;
        this.question=question;
        this.user_index=user_index;
        this.question_date=question_date;
        this.answer_date=answer_date;
        this.answer=answer;
        this.status=status;


    }


    public Integer getMyq_index() {
        return myq_index;
    }

    public void setMyq_index(Integer myq_index) {
        this.myq_index = myq_index;
    }

    public String getQuestion_title() {
        return question_title;
    }

    public void setQuestion_title(String question_title) {
        this.question_title = question_title;
    }

    public String getQuestion(){
        return question;
    }

    public void setQuestion(String question){
        this.question=question;
    }

    public Integer getUser_index() {
        return user_index;
    }

    public void setUser_index(Integer user_index) {
        this.user_index = user_index;
    }

    public Timestamp getQuestion_date() {
        return question_date;
    }

    public void setQuestion_date(Timestamp question_date) {
        this.question_date = question_date;
    }

    public Timestamp getAnswer_date() {
        return answer_date;
    }

    public void setAnswer_date(Timestamp answer_date) {
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

