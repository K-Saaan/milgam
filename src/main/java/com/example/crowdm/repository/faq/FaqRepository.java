package com.example.crowdm.repository.faq;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import com.example.crowdm.entity.faq.FaqEntity;

/**
 * 1. MethodName: FaqRepository
 * 2. ClassName : FaqRepository
 * 3. Comment   : FAQ repo
 * 4. 작성자    : boyeong
 * 5. 작성일    : 2024. 07. 03
 **/

@Repository
public interface FaqRepository extends JpaRepository<FaqEntity, Integer>, JpaSpecificationExecutor<FaqEntity> {

}
