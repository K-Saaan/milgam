package com.example.crowdm.dto.faq;

import java.sql.Timestamp;
/**
 * 1. MethodName: UnlockList
 * 2. ClassName : UnlockList
 * 3. Comment   : 계정 잠금 해제 목록 dto
 * 4. 작성자    : boyeong
 * 5. 작성일    : 2024. 07. 10
 **/
public class UnlockList {

    private String id;
    private String email;
    private Timestamp applyDate;
    private String status;

    public UnlockList() {}

    public UnlockList(String id, String email, Timestamp applyDate,String status) {
        this.id = id;
        this.email = email;
        this.applyDate = applyDate;
        this.status = status;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Timestamp getApplyDate() {
        return applyDate;
    }

    public void setApplyDate(Timestamp applyDate) {
        this.applyDate = applyDate;
    }

    public String getStatus() {
        return status;
    }
    public void setStatus(String status) {
        this.status = status;
    }
}
