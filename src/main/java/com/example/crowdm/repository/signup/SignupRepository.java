package com.example.crowdm.repository.signup;

import com.example.crowdm.entity.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface SignupRepository extends JpaRepository<UserEntity, String> {

}
