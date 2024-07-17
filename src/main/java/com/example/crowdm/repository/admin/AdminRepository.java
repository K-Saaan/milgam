package com.example.crowdm.repository.admin;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import com.example.crowdm.entity.admin.AdminEntity;

@Repository
public interface AdminRepository extends JpaRepository<AdminEntity, Integer>, JpaSpecificationExecutor<AdminEntity> {

    // 0715: 관리자 ID로 관리자 정보를 가져오는 메서드
    AdminEntity findById(String id);
}

