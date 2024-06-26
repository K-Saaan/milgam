package com.example.crowdm.repository.login;

import com.example.crowdm.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoginRepository extends JpaRepository<UserEntity, Integer>, JpaSpecificationExecutor<UserEntity> {
}
