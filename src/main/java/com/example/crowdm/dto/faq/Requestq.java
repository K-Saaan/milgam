package com.example.crowdm.dto.faq;

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
