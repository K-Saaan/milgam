package com.example.crowdm.repository.admin;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import com.example.crowdm.entity.admin.AdminEntity;


/**
 * 1. MethodName: AdminRepository
 * 2. ClassName : AdminRepository
 * 3. Comment   : 관리자 repo
 * 4. 작성자    : boyeong, sumin
 * 5. 작성일    : 2024. 07. 16
 **/
@Repository
public interface AdminRepository extends JpaRepository<AdminEntity, Integer>, JpaSpecificationExecutor<AdminEntity> {

    // 0715: 관리자 ID로 관리자 정보를 가져오는 메서드
    AdminEntity findById(String id);
}

