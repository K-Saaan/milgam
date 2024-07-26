package com.example.crowdm.controller.video;


import com.example.crowdm.dto.video.Videoq;

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


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;


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
    public ResponseEntity<List<String>> videoUpload(@RequestParam("file") MultipartFile mFile,
                                                    @RequestParam("originName") String fileOriginName,
                                                    @RequestParam("place") String place,
                                                    @RequestParam("time") String time,
                                                    @RequestPart("videoq") Videoq videoq,
                                                    Model model,
                                                    HttpServletRequest request) throws IOException{
        videoService.uploadmeta(videoq.getLength(), videoq.getSector(), videoq.getCamera_num(), videoq.getContent(), videoq.getFile_name(), videoq.getChunk_index(),request);

        // GCP VM으로 비디오 전송
        List<String> result = videoService.uploadToGCP(mFile, fileOriginName, place, time);
        model.addAttribute("data", result);
        return ResponseEntity.ok(result);
    }
}

