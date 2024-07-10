package com.example.crowdm.controller.video;

import com.example.crowdm.service.video.VideoService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
    public void videoUpload(@RequestParam("chunkFile") MultipartFile mFile,
                            @RequestParam("chunkIndex") int chunkIndex,
                            @RequestParam("totalChunks") int totalChunks) throws IOException{
        videoService.uploadToGCP(mFile, chunkIndex, totalChunks);
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
        messagingTemplate.convertAndSend("/topic/video/", resultContent);
        return ResponseEntity.ok("Result to front");
    }
}
