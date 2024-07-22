package com.example.crowdm.controller.sse;

import com.example.crowdm.dto.message.MessageLogDto;
import com.example.crowdm.listener.message.MessageLogListener;
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
    private static final Logger logger = LoggerFactory.getLogger(MessageLogListener.class);
    private final List<SseEmitter> emitters = new ArrayList<>();

    @GetMapping("/sse")
    public SseEmitter connect() {
        SseEmitter emitter = new SseEmitter(86_400_000L);
        emitters.add(emitter);
        logger.info("New emitter connected. Total emitters: {}", emitters.size());

        emitter.onCompletion(() -> {
            emitters.remove(emitter);
            logger.info("Emitter completed. Total emitters: {}", emitters.size());
        });
        emitter.onTimeout(() -> {
            emitters.remove(emitter);
            logger.info("Emitter timeout. Total emitters: {}", emitters.size());
        });
        emitter.onError((e) -> {
            emitters.remove(emitter);
            logger.error("Emitter error. Total emitters: {}", emitters.size(), e);
        });

        return emitter;
    }

    @Transactional // 트랜잭션 경계를 명확히 설정합니다.
    public void sendMessageToClients(MessageLogDto messageLogDto) {
        logger.info("sendMessageToClients: {}", messageLogDto);
        List<SseEmitter> deadEmitters = new ArrayList<>();
        emitters.forEach(emitter -> {
            try {
                logger.info("Sending message to emitter: {}", emitter);
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