package com.example.crowdm.entity.faq;

import lombok.*;

import javax.persistence.*;

/**
 * 1. MethodName: FaqEntity
 * 2. ClassName : FaqEntity
 * 3. Comment   : FAQ 엔티티
 * 4. 작성자    : boyeong
 * 5. 작성일    : 2024. 07. 03
 **/

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