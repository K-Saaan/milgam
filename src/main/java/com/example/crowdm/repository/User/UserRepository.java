/** 0701 이수민
 * 사용자 아이디로 사용자를 조회하고 업데이트
 * **/

package com.example.crowdm.repository.User;

import com.example.crowdm.entity.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
/*

@Repository
public interface UserRepository extends JpaRepository<UserEntity, String> { // 제네릭 타입을 String으로 변경
    Optional<UserEntity> findById(String id);
    UserEntity findByUserIndex(int userIndex);
    @Modifying
    @Query("UPDATE UserEntity u SET u.fail_cnt = u.fail_cnt + 1, u.account_lock = CASE WHEN u.fail_cnt >= 4 THEN true ELSE u.account_lock END WHERE u.id = :id")
    void incrementFailCount(@Param("id") String id);
}*/
