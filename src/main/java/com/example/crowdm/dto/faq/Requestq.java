package com.example.crowdm.dto.faq;

/**
 * 1. MethodName: Requestq
 * 2. ClassName : Requestq
 * 3. Comment   : 1:1 문의 답변 등록 요청 dto
 * 4. 작성자    : boyeong
 * 5. 작성일    : 2024. 07. 4
 **/

public class Requestq {


    private Integer myq_index;
    private String answer;

    public Requestq() {}

    public Requestq(Integer myq_index, String answer) {
        this.myq_index = myq_index;
        this.answer = answer;
    }

    public Integer getMyq_index() {
        return myq_index;
    }

    public void setMyq_index(Integer myq_index) {
        this.myq_index = myq_index;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }
}
