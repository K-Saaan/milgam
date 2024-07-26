package com.example.crowdm.dto.faq;

/**
 * 1. MethodName: MailDto
 * 2. ClassName : MailDto
 * 3. Comment   : 메일 발송 형식 dto
 * 4. 작성자    : boyeong
 * 5. 작성일    : 2024. 07. 5
 **/

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
