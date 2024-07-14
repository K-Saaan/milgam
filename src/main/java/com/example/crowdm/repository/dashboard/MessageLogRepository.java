package com.example.crowdm.repository.dashboard;

import com.example.crowdm.entity.dashboard.MessageLogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageLogRepository extends JpaRepository<MessageLogEntity, Integer>, JpaSpecificationExecutor<MessageLogEntity> {
}
