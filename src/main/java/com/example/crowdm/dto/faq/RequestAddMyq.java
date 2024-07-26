package com.example.crowdm.dto.faq;



/**
 * 1. MethodName: RequestAddMyq
 * 2. ClassName : RequestAddMyq
 * 3. Comment   : 1:1 문의 등록하는 요청 dto
 * 4. 작성자    : boyeong
 * 5. 작성일    : 2024. 07. 12
 **/
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
