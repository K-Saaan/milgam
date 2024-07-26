package com.example.crowdm.controller.sse;

import com.example.crowdm.dto.message.MessageLogDto;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
public class SseController {
    private static final Logger logger = LoggerFactory.getLogger(SseController.class);
    private final List<SseEmitter> emitters = new ArrayList<>();


    /**
     * 1. MethodName: SseEmitter
     * 2. ClassName : SseController
     * 3. Comment   : 서버-전송 이벤트(Server-Sent Events, SSE)를 설정
     * 4. 작성자    : been
     * 5. 작성일    : 2024. 07. 26
     **/
    @GetMapping("/sse")
    public SseEmitter connect() {
        SseEmitter emitter = new SseEmitter(86_400_000L);
        emitters.add(emitter);

        emitter.onCompletion(() -> emitters.remove(emitter));
        emitter.onTimeout(() -> emitters.remove(emitter));
        emitter.onError(e -> emitters.remove(emitter));

        return emitter;
    }

    /**
     * 1. MethodName: sendMessageToClients
     * 2. ClassName : SseController
     * 3. Comment   : SSE를 통해 클라이언트들에게 메시지를 전송하는 기능
     * 4. 작성자    : been
     * 5. 작성일    : 2024. 07. 26
     **/
    @Transactional // 트랜잭션 경계를 명확히 설정합니다.
    public void sendMessageToClients(MessageLogDto messageLogDto) {
        List<SseEmitter> deadEmitters = new ArrayList<>();
        emitters.forEach(emitter -> {
            try {
                emitter.send(SseEmitter.event()
                        .name("message-log")
                        .data(messageLogDto, MediaType.APPLICATION_JSON));
                logger.info("Successfully sent message to emitter: {}", emitter);
            } catch (IOException e) {
                deadEmitters.add(emitter);
                logger.error("Failed to send message to emitter: {}", emitter, e);
            }
        });
        emitters.removeAll(deadEmitters);
        logger.info("Removed dead emitters. Total emitters: {}", emitters.size());
    }
}