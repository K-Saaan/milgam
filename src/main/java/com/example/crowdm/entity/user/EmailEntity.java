package com.example.crowdm.entity.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
@Builder
@DynamicUpdate
@AllArgsConstructor
@Table(name = "email", schema = "public")

/**
 * 1. ClassName: user
 * 2. FileName : EmailEntity.java
 * 3. Package  : com.example.crowdm.entity
 * 4. Comment  : 회원가입에 필요한 이메일 Entity
 * 5. 작성자   : 유병민
 * 6. 작성일   : 2024. 07. 26
 */

public class EmailEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "email_index")
    private Integer id;

    // 이메일 주소
    @Column(name = "email", nullable = false)
    private String email;

    // 이메일 인증 여부
    @Column(name = "email_status", nullable = false)
    private boolean emailStatus;

    // 인증 코드
    @Column(name = "code", nullable = false)
    private String code;
}
