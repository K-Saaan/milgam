package com.example.crowdm.dto.faq;

import java.sql.Timestamp;

public class UnlockList {

    private String id;
    private String email;
    private Timestamp applyDate;
    private int role_index;

    public UnlockList() {}

    public UnlockList(String id, String email, Timestamp applyDate, int role_index) {
        this.id = id;
        this.email = email;
        this.applyDate = applyDate;
        this.role_index = role_index;
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

    public int getRole_index() {
        return role_index;
    }

    public void setRole_index(int role_index) {
        this.role_index = role_index;
    }
}
