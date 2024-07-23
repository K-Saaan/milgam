package com.example.crowdm.controller.video;

import com.example.crowdm.dto.faq.Answerq;
import com.example.crowdm.dto.faq.Requestq;
import com.example.crowdm.dto.video.Videoq;
import com.example.crowdm.entity.video.VideoEntity;
import com.example.crowdm.service.video.VideoService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Controller
@RequiredArgsConstructor
@RequestMapping("/api")
public class VideoController {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    private final VideoService videoService;
    public SimpMessagingTemplate messagingTemplate;
    private final RestTemplate restTemplate;

    @Value("${url.gcp_upload}")
    String gcpUrl;

    /**
     * 1. MethodName: videoUploadPage
     * 2. ClassName : VideoController
     * 3. Comment   : 비디오 업로드 페이지 이동
     * 4. 작성자    : san
     * 5. 작성일    : 2024. 06. 27
     **/
    @GetMapping("/VideoPage")
    public String goUploadPage(HttpServletRequest request, HttpServletResponse response, Model model) {

        return "api/VideoPage";
    }

    /**
     * 1. MethodName: videoUpload
     * 2. ClassName : VideoController
     * 3. Comment   : 비디오 업로드
     * 4. 작성자    : san
     * 5. 작성일    : 2024. 06. 27
     **/
    @PostMapping("/videoUpload")
    public List videoUpload(@RequestParam("file") MultipartFile mFile,
                            @RequestParam("originName") String fileOriginName,
                            @RequestParam("place") String place,
                            @RequestParam("time") String time) throws IOException{
            List<String> result = videoService.uploadToGCP(mFile, fileOriginName, place, time);
            return result;
    }

    /**
     * 1. MethodName: videoUpload
     * 2. ClassName : VideoController
     * 3. Comment   : 비디오 업로드
     * 4. 작성자    : san
     * 5. 작성일    : 2024. 06. 27
     **/
    @PostMapping("/videoResult")
    public ResponseEntity handleResult(@RequestParam("result") MultipartFile result,
                                       @RequestParam("chunkIndex") int chunkIndex,
                                       @RequestParam("totalChunks") int totalChunks) throws IOException{
        String resultContent = new String(result.getBytes(), "UTF-8");
        logger.info("resultContent = {}", resultContent);
        logger.info("chunkIndex = {}", chunkIndex);
        logger.info("totalChunks = {}", totalChunks);
        messagingTemplate.convertAndSend("/videoresult", resultContent);
        return ResponseEntity.ok("Result to front");
    }


    /**
     * 1. MethodName: uploadmeta
     * 2. ClassName : VideoController
     * 3. Comment   : 비디오 메타 데이터 저장
     * 4. 작성자    : boyeong
     * 5. 작성일    : 2024. 07. 16
     **/
    @PostMapping("/uploadmeta")
    public ResponseEntity<VideoEntity> uploadMeta(@RequestBody Videoq videoq, HttpServletRequest request) {
        VideoEntity result = videoService.uploadmeta(videoq.getLength(), videoq.getSector(), videoq.getCamera_num(), videoq.getContent(), videoq.getFile_name(), videoq.getChunk_index(),request);

        return ResponseEntity.ok(result);
    }


}

