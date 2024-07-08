package com.example.crowdm.repository.admin;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import com.example.crowdm.entity.admin.MyqEntity;
@Repository
public interface MyqRepository extends JpaRepository<MyqEntity, Integer>, JpaSpecificationExecutor<MyqEntity> {

}
