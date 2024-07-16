package com.example.crowdm.dto.user;

import java.sql.Timestamp;

public class PermissionList {
    //private Integer user_index;
    private Integer user_index;
    private String id;
    private String email;
    private String role;
    private Timestamp applyDate;
    private String status;

    // Default constructor
    public PermissionList() {}

    // Parameterized constructor
    public PermissionList( Integer user_index,  String id, String email, String role, Timestamp applyDate, String status) {
        this.user_index=user_index;
        this.id = id;
        this.email = email;
        this.role = role;
        this.applyDate = applyDate;
        this.status = status;
    }

    // Getters and Setters
    //public Integer getUserIndex() {
    //    return user_index;
    //}
    public Integer getUser_index() {
        return user_index;
    }
    public void setUser_index(Integer user_index) {
        this.user_index = user_index;
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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
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
