package com.example.crowdm.repository.signup;

import com.example.crowdm.entity.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SignupRepository extends JpaRepository<UserEntity, String> {
    /**
     * 1. ClassName: signup
     * 2. FileName : SignupRepository.java
     * 3. Package  : com.example.crowdm.repository
     * 4. Comment  : user 테이블에 매핑하는 역할
     * 5. 작성자   : 유병민
     * 6. 작성일   : 2024. 07. 26
     */
}
