package com.example.crowdm.entity.admin;
import lombok.*;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.sql.Timestamp;


@Getter
@Entity
@Builder
@AllArgsConstructor
//@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "myq", schema="public")
public class MyqEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "myq_index")
    private int myq_index;

    @Column(name = "question_title")
    private String question_title;

    @Column(name = "question")
    private String question;

    @Column(name = "question_date")
    private Timestamp question_date;

    @Column(name = "user_index")
    private Integer user_index;

    @Column(name = "answer")
    private String answer;

    @Column(name = "answer_date")
    private Timestamp answer_date;

    @Column(name = "admin_index")
    private Integer admin_index;

    public MyqEntity() {
    }
    @Transactional
    public void updateAnswerDate(Timestamp date, String answercontext){
        this.admin_index=1;
        this.answer_date=date;
        this.answer=answercontext;
        //this.admin_index=1; 나중에 세션값으로 바꿔야함

    }

    public Integer getUserId() {
        return user_index;
    }

    public void setUserId(int user_index) {
        this.user_index=user_index;
    }

    public String getQuestionTitle() {
        return question_title;
    }

    public void setQuestionTitle(String question_title) {
        this.question_title = question_title;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public Timestamp getQuestionDate() {
        return question_date;
    }
    public void setQuestionDate(Timestamp question_date) {
        this.question_date = question_date;
    }

    public Integer getUserIndex() {
        return user_index;
    }
    public void setUserIndex(Integer user_index) {
        this.user_index = user_index;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public Timestamp getAnswerDate() {
        return answer_date;
    }

    public void setAnswerDate(Timestamp answer_date) {
        this.answer_date = answer_date;
    }
    public Integer getAdminIndex() {
        return admin_index;
    }
    public void setAdminIndex(Integer admin_index) {
        this.admin_index = admin_index;
    }


}
