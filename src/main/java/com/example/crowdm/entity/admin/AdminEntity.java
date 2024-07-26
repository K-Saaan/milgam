package com.example.crowdm.entity.admin;


import lombok.*;

import javax.persistence.*;


/**
 * 1. MethodName: admin
 * 2. ClassName : AdminEntity
 * 3. Comment   : 관리자 엔티티
 * 4. 작성자    : boyeong
 * 5. 작성일    : 2024. 07. 3
 **/

@Getter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "admin", schema="public")
public class AdminEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "admin_index")
    private int admin_index;

    @Column(name = "id")
    private String id;
    @Column(name = "pw")
    private String pw;
    @Column(name = "name")
    private String name;
    @Column(name = "email")
    private String email;
    @Column(name = "phone")
    private String phone;
    @Column(name = "auth")
    private String auth;
}
