package com.example.crowdm.repository.admin;


import com.example.crowdm.entity.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.crowdm.entity.admin.MyqEntity;

import java.util.List;

@Repository
public interface MyqRepository extends JpaRepository<MyqEntity, Integer>, JpaSpecificationExecutor<MyqEntity> {


    @Query("SELECT u FROM MyqEntity u WHERE u.user_index = :userId")
    List<MyqEntity> findByUser(@Param("userId") Integer userId);
}
