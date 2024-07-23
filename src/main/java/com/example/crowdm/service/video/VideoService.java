package com.example.crowdm.service.video;

import com.example.crowdm.config.NamedByteArrayResource;
import com.example.crowdm.entity.admin.MyqEntity;
import com.example.crowdm.entity.event.EventEntity;
import com.example.crowdm.entity.user.UserEntity;
import com.example.crowdm.entity.video.VideoEntity;
import com.example.crowdm.repository.event.EventRepository;
import com.example.crowdm.repository.login.LoginRepository;
import com.example.crowdm.repository.video.VideoRepository;
import com.example.crowdm.util.DateUtil;
import lombok.RequiredArgsConstructor;
import org.hibernate.boot.Metadata;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.Optional;
import java.util.UUID;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.socket.BinaryMessage;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;

@Service
@RequiredArgsConstructor
public class VideoService {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    private final RestTemplate restTemplate;

    private final LoginRepository loginRepository;
    private final VideoRepository videoRepository;
    private final EventRepository eventRepository;

    @Value("${file_path.video_path}")
    String uploadPath;

    @Value("${url.gcp_upload}")
    String gcpUrl;

    public void uploadToGCP(MultipartFile file, int chunkIndex, int totalChunks, String fileOriginName, String place, String time) {
        try{
            RestTemplate restTemplate = new RestTemplate();
            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            String uuid = UUID.randomUUID().toString();
            String fileName = uuid + chunkIndex + fileOriginName;
            String convertTime = DateUtil.convertTo24HourFormat(time);


//            fileTransferService.uploadFile(file, fileName);

//            ByteArrayResource chunkFile = new ByteArrayResource(file.getBytes());
            NamedByteArrayResource chunkFile = new NamedByteArrayResource(file.getBytes(), file.getOriginalFilename());

            body.add("file", chunkFile);
            body.add("fileName", fileName);
            body.add("place", place);
            body.add("time", convertTime);
            body.add("chunkIndex", chunkIndex);
            body.add("totalChunks", totalChunks);

            logger.info("body : {}",  body);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

            ResponseEntity response = restTemplate.postForEntity(gcpUrl, requestEntity, String.class);
            logger.info("Response : {}",response.getBody().toString());

        }catch (Exception e){
            logger.error("uploadToGCP Error : ",e.getMessage());
        }
    }


    public String[] findGuDong(Integer user_index){

        Optional<UserEntity> userOptional = loginRepository.findById(user_index);
        UserEntity user = userOptional.get();
        Integer event_index=user.getEvent_index();
        Optional<EventEntity> eventOptional = eventRepository.findById(event_index);
        EventEntity event = eventOptional.get();
        return new String[]{event.getGu(), event.getDong()};

    }

    @Transactional
    public VideoEntity uploadmeta(String length, String sector, Integer camera_num, String content, String file_name, Integer chunk_index, HttpServletRequest request) {

        //session
        HttpSession session = request.getSession();
        Integer user_index = (Integer) session.getAttribute("user_index");
        //Integer user_index = 11;

        String[] guDong = findGuDong(user_index);
        String gu = guDong[0];
        String dong = guDong[1];

        Timestamp date = new Timestamp(System.currentTimeMillis());

        String uuid = UUID.randomUUID().toString();
        String path = uploadPath+uuid;

        VideoEntity newvideo = new VideoEntity(date, path, length, gu, dong, sector, camera_num, content, uuid, user_index, file_name, chunk_index);
        videoRepository.save(newvideo);

        return newvideo;
    }

}
