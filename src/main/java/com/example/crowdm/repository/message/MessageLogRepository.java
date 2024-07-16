package com.example.crowdm.repository.message;

import com.example.crowdm.entity.message.MessageLogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageLogRepository extends JpaRepository<MessageLogEntity, Integer>, JpaSpecificationExecutor<MessageLogEntity> {
    List<MessageLogEntity> findByLogIndexIn(List<Integer> logIndices);
}
