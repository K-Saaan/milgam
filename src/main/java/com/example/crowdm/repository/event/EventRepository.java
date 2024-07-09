package com.example.crowdm.repository.event;

import com.example.crowdm.entity.event.EventEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface EventRepository extends JpaRepository<EventEntity, Integer>, JpaSpecificationExecutor<EventEntity> {

}
