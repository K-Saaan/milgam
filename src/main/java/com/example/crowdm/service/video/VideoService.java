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
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.hibernate.boot.Metadata;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
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
import com.fasterxml.jackson.databind.type.TypeFactory;

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

    public List<String> uploadToGCP(MultipartFile file, String fileOriginName, String place, String time) {
        try{
            HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
            factory.setConnectTimeout(1000 * 300);
            factory.setReadTimeout(1000 * 300);
            RestTemplate restTemplate = new RestTemplate();
            restTemplate.getMessageConverters().add(0, new StringHttpMessageConverter(StandardCharsets.UTF_8));

            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            String uuid = UUID.randomUUID().toString();
            String fileName = uuid + fileOriginName;
            String convertTime = DateUtil.convertTo24HourFormat(time);

            NamedByteArrayResource chunkFile = new NamedByteArrayResource(file.getBytes(), file.getOriginalFilename());
            body.add("file", chunkFile);
            body.add("fileName", fileName);
            body.add("place", place);
            body.add("time", convertTime);

            logger.info("body : {}",  body);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

            ResponseEntity response = restTemplate.postForEntity(gcpUrl, requestEntity, String.class);
            logger.info("Response body: {}",response.getBody());
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(response.getBody().toString());
            JsonNode resultNode = rootNode.path("result");
            List<String> result = new ArrayList<>();


            for (JsonNode arrayNode : resultNode) {
                logger.info("arrayNode {}", arrayNode);
                if (arrayNode.size() >2) {
                    String[] answer = arrayNode.get(2).asText().split("\\[답변\\]:");
                    logger.info("answer {}", answer);
                    String combinedString = "[" + arrayNode.get(0).asText() + ", " + arrayNode.get(1).asText() + ", " + answer[1] + "]";
                    result.add(combinedString);
                }else{
                    String combinedString = "[" + arrayNode.get(0).asText() + ", " + arrayNode.get(1).asText() + "]";
                    result.add(combinedString);
                }

            }


            logger.info("result {}", result);
            return result;
        }catch (Exception e){
            logger.error("uploadToGCP Error : ",e.getMessage());
            return null;
        }
    }


    public String[] findGuDong(Integer user_index){
        logger.info("user_index : {}", user_index);
        if (user_index == null){
            user_index = 11;
        }
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
        if(user_index == null){
            user_index = 11;
        }

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
