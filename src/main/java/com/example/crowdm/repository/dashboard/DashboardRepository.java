package com.example.crowdm.repository.dashboard;

import com.example.crowdm.entity.dashboard.MessagelogEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface DashboardRepository extends JpaRepository<MessagelogEntity, Integer>, JpaSpecificationExecutor<MessagelogEntity> {
}
