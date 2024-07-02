package com.example.crowdm.service.video;

import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import config.VideoStreamHandler;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
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

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;

@Service
@RequiredArgsConstructor
public class VideoService {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Value("${file_path.upload}")
    String uploadPath;

    @Value("${server.gcp_upload}")
    String gcpUrl;

    public ResponseEntity<String> uploadToGCP(MultipartFile file, int chunkIndex, int totalChunks) {
        try{
            RestTemplate restTemplate = new RestTemplate();
            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            String uuid = UUID.randomUUID().toString();
            String fileName = uuid + chunkIndex + file.getOriginalFilename();
            body.add("file", new ByteArrayResource(file.getBytes()));
            body.add("fileName", fileName);
            body.add("chunkIndex", chunkIndex);
            body.add("totalChunks", totalChunks);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);
            ResponseEntity response = restTemplate.postForEntity(gcpUrl, requestEntity, String.class);
            logger.info("Response : {}",response.getBody().toString());
            return response.ok("upload success");
        }catch (IOException e){
            logger.error("uploadToGCP Error : ",e.getMessage());
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("");
        }
        return null;
    }
}
