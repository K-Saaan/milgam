package com.example.crowdm.repository.login;

import com.example.crowdm.entity.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import org.springframework.data.repository.query.Param;

import org.springframework.transaction.annotation.Transactional;


/**
 * 1. MethodName: LoginRepository
 * 2. ClassName : LoginRepository
 * 3. Comment   : login repo
 * 4. 작성자    : boyeong, byeongmin, k-ssan
 * 5. 작성일    : 2024. 07. 12
 **/

@Repository
public interface LoginRepository extends JpaRepository<UserEntity, Integer>, JpaSpecificationExecutor<UserEntity> {

    @Query("SELECT u FROM UserEntity u WHERE u.id = :userId")
    UserEntity findByUser(@Param("userId") String userId);

    // 비밀번호 검증을 위한 메서드 추가
    @Query("SELECT u FROM UserEntity u WHERE u.id = :userId and u.pw = :password")
    UserEntity findByUserIdAndPassword(@Param("userId") String userId, @Param("password") String password);

    // 실패 카운트와 계정 잠금을 업데이트하는 메서드
    @Modifying
    @Transactional
    @Query("UPDATE UserEntity u SET u.fail_cnt = :failCnt, u.account_lock = :lock WHERE u.id = :userId")
    void updateFailCntAndLock(@Param("userId") String userId, @Param("failCnt") int failCnt, @Param("lock") boolean lock);


}

