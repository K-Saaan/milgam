package com.example.crowdm.dto.user;

import java.sql.Timestamp;
/**
 * 1. MethodName: UserDetail
 * 2. ClassName : UserDetail
 * 3. Comment   : 내 페이지 프로필 디테일 dto
 * 4. 작성자    : boyeong
 * 5. 작성일    : 2024. 07. 09
 **/
public class UserDetail {
    private Integer user_index;
    private String id;
    private String email;
    private String name;
    private String phone;
    private String role;
    private Timestamp start_date;
    private Timestamp end_date;
    private String org;
    private String org_phone;
    private String status;

    // Getter and Setter for user_index
    public Integer getUser_index() {
        return user_index;
    }

    public void setUser_index(Integer user_index) {
        this.user_index = user_index;
    }

    // Getter and Setter for id
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    // Getter and Setter for email
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Getter and Setter for name
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Getter and Setter for phone
    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    // Getter and Setter for role
    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    // Getter and Setter for start_date
    public Timestamp getStart_date() {
        return start_date;
    }

    public void setStart_date(Timestamp start_date) {
        this.start_date = start_date;
    }

    // Getter and Setter for end_date
    public Timestamp getEnd_date() {
        return end_date;
    }

    public void setEnd_date(Timestamp end_date) {
        this.end_date = end_date;
    }

    // Getter and Setter for org
    public String getOrg() {
        return org;
    }

    public void setOrg(String org) {
        this.org = org;
    }

    // Getter and Setter for org_phone
    public String getOrg_phone() {
        return org_phone;
    }

    public void setOrg_phone(String org_phone) {
        this.org_phone = org_phone;
    }

    // Getter and Setter for status
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
