package com.example.crowdm.dto.faq;

public class MailDto {
    private String address;
    private String title;
    private String message;

    // 기본 생성자
    public MailDto() {}

    // getter 및 setter 메서드
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
