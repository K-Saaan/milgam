package com.example.crowdm.entity.admin;
import lombok.*;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.sql.Timestamp;


@Getter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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


    @Transactional
    public void updateAnswerDate(Timestamp date, String answercontext){
        this.admin_index=1;
        this.answer_date=date;
        this.answer=answercontext;
        //this.admin_index=1; 나중에 세션값으로 바꿔야함

    }

}
