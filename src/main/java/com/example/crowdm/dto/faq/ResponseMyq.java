package com.example.crowdm.dto.faq;

import java.sql.Time;
import java.sql.Timestamp;

public class ResponseMyq {
    private Integer myqIndex;
    private String questionTitle;
    private String question;
    private Timestamp questionDate;
    private Integer userIndex;
    private String answer;
    private Timestamp answerDate;
    private Integer adminIndex;

    public ResponseMyq(Integer myqIndex, String questionTitle, String question, Timestamp questionDate, Integer userIndex, String answer, Timestamp answerDate, Integer adminIndex) {
        this.myqIndex = myqIndex;
        this.questionTitle = questionTitle;
        this.question = question;
        this.questionDate = questionDate;
        this.userIndex = userIndex;
        this.answer = answer;
        this.answerDate = answerDate;
        this.adminIndex = adminIndex;
    }

    // Getters and Setters

    public Integer getMyqIndex() {
        return myqIndex;
    }

    public void setMyqIndex(Integer myqIndex) {
        this.myqIndex = myqIndex;
    }

    public String getQuestionTitle() {
        return questionTitle;
    }

    public void setQuestionTitle(String questionTitle) {
        this.questionTitle = questionTitle;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public Timestamp getQuestionDate() {
        return questionDate;
    }

    public void setQuestionDate(Timestamp questionDate) {
        this.questionDate = questionDate;
    }

    public Integer getUserIndex() {
        return userIndex;
    }

    public void setUserIndex(Integer userIndex) {
        this.userIndex = userIndex;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public Timestamp getAnswerDate() {
        return answerDate;
    }

    public void setAnswerDate(Timestamp answerDate) {
        this.answerDate = answerDate;
    }

    public Integer getAdminIndex() {
        return adminIndex;
    }

    public void setAdminIndex(Integer adminIndex) {
        this.adminIndex = adminIndex;
    }
}
