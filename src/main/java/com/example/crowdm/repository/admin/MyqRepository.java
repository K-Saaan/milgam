package com.example.crowdm.repository.admin;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.crowdm.entity.admin.MyqEntity;

import java.util.List;

/**
 * 1. MethodName: MyqRepository
 * 2. ClassName : MyqRepository
 * 3. Comment   : 1:1문의 repo
 * 4. 작성자    : boyeong
 * 5. 작성일    : 2024. 07. 12
 **/

@Repository
public interface MyqRepository extends JpaRepository<MyqEntity, Integer>, JpaSpecificationExecutor<MyqEntity> {


    @Query("SELECT u FROM MyqEntity u WHERE u.user_index = :userId")
    List<MyqEntity> findByUser(@Param("userId") Integer userId);
}
