package com.example.crowdm.repository.event;

import com.example.crowdm.entity.event.EventEntity;
import com.example.crowdm.entity.user.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.sql.Timestamp;
import java.util.List;

@Repository
public interface EventRepository extends JpaRepository<EventEntity, Integer>, JpaSpecificationExecutor<EventEntity> {


    @Query("SELECT e FROM EventEntity e WHERE :now BETWEEN e.start_date AND e.end_date")
    List<EventEntity> findEventsWithinCurrentTime(Timestamp now);

}
