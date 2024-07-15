package com.example.crowdm.repository.message;


import com.example.crowdm.entity.message.MessageManageEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageManageRepository extends JpaRepository<MessageManageEntity, Integer> , JpaSpecificationExecutor<MessageManageEntity> {

}
