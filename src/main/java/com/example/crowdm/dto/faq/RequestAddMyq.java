package com.example.crowdm.dto.faq;

import java.sql.Timestamp;

public class RequestAddMyq {

    private String question_title;
    private String question;


    public RequestAddMyq() {}
    public RequestAddMyq( String question_title, String question) {

        this.question_title=question_title;
        this.question=question;



    }


    public String getQuestion_title() {return question_title;}
    public void setQuestion_title(String question_title) {this.question_title = question_title;}

    public String getQuestion() {return question;}
    public void setQuestion(String question) {this.question = question;}



}
