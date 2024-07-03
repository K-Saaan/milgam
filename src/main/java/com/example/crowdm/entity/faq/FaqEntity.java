package com.example.crowdm.entity.faq;

import lombok.*;

import javax.persistence.*;


@Getter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "faq", schema="public")
public class FaqEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "faq_index")
    private int faq_index;

    @Column(name = "question")
    private String question;
    @Column(name = "answer")
    private String answer;
}