package com.example.crowdm.repository.signup;

import com.example.crowdm.dto.signup.EmailDto;
import com.example.crowdm.entity.user.EmailEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailRepository extends JpaRepository<EmailEntity, String> {
    EmailEntity findByEmail(String email);
}
