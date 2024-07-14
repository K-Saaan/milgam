package com.example.crowdm.repository.dashboard;

import com.example.crowdm.entity.dashboard.MessageManageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

@Repository
public interface MessageManageRepository extends JpaRepository<MessageManageEntity, Integer>, JpaSpecificationExecutor<MessageManageEntity> {
}
