package com.example.crowdm.repository.video;


import com.example.crowdm.entity.video.VideoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
@Repository
public interface VideoRepository extends JpaRepository<VideoEntity, Integer>, JpaSpecificationExecutor<VideoEntity>{
}
