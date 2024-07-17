package com.example.crowdm.entity.user;

import lombok.*;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.data.repository.cdi.Eager;

import javax.persistence.*;

@Getter
@NoArgsConstructor
@Entity
@Builder
@DynamicUpdate
@AllArgsConstructor
@Table(name = "email", schema = "public")
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
