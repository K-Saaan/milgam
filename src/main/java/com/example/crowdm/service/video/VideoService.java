package com.example.crowdm.service.video;

import com.example.crowdm.config.NamedByteArrayResource;

import com.example.crowdm.entity.event.EventEntity;
import com.example.crowdm.entity.user.UserEntity;
import com.example.crowdm.entity.video.VideoEntity;
import com.example.crowdm.repository.event.EventRepository;
import com.example.crowdm.repository.login.LoginRepository;
import com.example.crowdm.repository.video.VideoRepository;
import com.example.crowdm.util.DateUtil;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.http.*;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.nio.charset.StandardCharsets;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.http.MediaType;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import org.springframework.web.client.RestTemplate;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;


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

    /**
     * 1. MethodName: uploadToGCP
     * 2. ClassName : VideoService
     * 3. Comment   : GCP로 전송할 데이터 정의 및 데이터 송수신 정의
     * 4. 작성자    : san
     * 5. 작성일    : 2024. 07. 17
     **/
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

            // 전송할 데이터 정의
            NamedByteArrayResource chunkFile = new NamedByteArrayResource(file.getBytes(), file.getOriginalFilename());
            body.add("file", chunkFile);
            body.add("fileName", fileName);
            body.add("place", place);
            body.add("time", convertTime);

            logger.info("body : {}",  body);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

            // 데이터 post 요청 후 response 처리
            ResponseEntity response = restTemplate.postForEntity(gcpUrl, requestEntity, String.class);
            logger.info("Response body: {}",response.getBody());
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode rootNode = objectMapper.readTree(response.getBody().toString());
            JsonNode resultNode = rootNode.path("result");
            List<String> result = new ArrayList<>();

            for (JsonNode arrayNode : resultNode) {
                // 임계치 이상 상황이 발생한 경우
                if (arrayNode.size() >2) {
                    String[] answer = arrayNode.get(2).asText().split("\\[답변\\]:");
                    String combinedString = "[" + arrayNode.get(0).asText() + ", " + arrayNode.get(1).asText() + ", " + answer[1] + "]";
                    result.add(combinedString);

                // 임계치 이상 상황이 발생하지 않은 경우
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


    /**
     * 1. MethodName: findGuDong
     * 2. ClassName : VideoService
     * 3. Comment   : 비디오 위치 찾기
     * 4. 작성자    : boyeong, k-ssan
     * 5. 작성일    : 2024. 07. 24
     **/
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


    /**
     * 1. MethodName: uploadmeta
     * 2. ClassName : VideoService
     * 3. Comment   : 비디오 위치 찾기
     * 4. 작성자    : boyeong, k-ssan, byeongmin
     * 5. 작성일    : 2024. 07. 25
     **/
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
