package com.example.crowdm.repository.video;


import com.example.crowdm.entity.video.VideoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

/**
 * 1. MethodName: VideoRepository
 * 2. ClassName : VideoRepository
 * 3. Comment   : 비디오 repo
 * 4. 작성자    : boyeong
 * 5. 작성일    : 2024. 07. 16
 **/

@Repository
public interface VideoRepository extends JpaRepository<VideoEntity, Integer>, JpaSpecificationExecutor<VideoEntity>{
}
