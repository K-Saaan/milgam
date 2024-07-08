package com.example.crowdm.repository.faq;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import com.example.crowdm.entity.faq.FaqEntity;
@Repository
public interface FaqRepository extends JpaRepository<FaqEntity, Integer>, JpaSpecificationExecutor<FaqEntity> {

}
