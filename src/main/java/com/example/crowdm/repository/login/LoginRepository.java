package com.example.crowdm.repository.login;

import com.example.crowdm.entity.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import com.example.crowdm.entity.user.UserEntity;

import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;

@Repository
public interface LoginRepository extends JpaRepository<UserEntity, Integer>, JpaSpecificationExecutor<UserEntity> {
        /*
         * @Modifying
         *
         * @Transactional
         * // @Query(value =
         * "UPDATE UserEntity u SET u.permission_yn = :permission_yn WHERE u.user_index = :user_index"
         * , nativeQuery = true)
         *
         * @Query(value =
         * "UPDATE public.users SET permission_yn = TRUE WHERE user_index =: user_index"
         * , nativeQuery = true)
         * // int updatePermissionYnById(@Param("user_index") int
         * user_index, @Param("permission_yn") boolean permission_yn);
         * int updatePermissionYnById(@Param("user_index")int user_index);
         */
        /*
         * @Modifying
         *
         * @Transactional
         *
         * @Query("UPDATE UserEntity u SET u.permission_date = :permission_date WHERE u.user_index = :user_index"
         * )
         * int updatePermissionDateById(@Param("user_index") int
         * user_index, @Param("permission_date") Timestamp permission_date);
         *
         * @Modifying
         *
         * @Transactional
         *
         * @Query("UPDATE UserEntity u SET u.admin_index = :admin_index WHERE u.user_index = :user_index"
         * )
         * int updateAdminIndexById(@Param("user_index") int
         * user_index, @Param("admin_index") int admin_index);
         */

        @Query(value = "select * from users where id = :userId and pw = :password", nativeQuery = true)
        UserEntity findByUser(@Param("userId") String userId, @Param("password") String password);

        @Query("SELECT u FROM UserEntity u WHERE u.id = :userId")
        UserEntity findByUser(@Param("userId") String userId);

        // 비밀번호 검증을 위한 메서드 추가
        @Query("SELECT u FROM UserEntity u WHERE u.id = :userId and u.pw = :password")
        UserEntity findByUserIdAndPassword(@Param("userId") String userId, @Param("password") String password);
}