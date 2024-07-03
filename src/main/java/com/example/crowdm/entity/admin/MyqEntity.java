package com.example.crowdm.entity.admin;
import lombok.*;

import javax.persistence.*;
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


}
