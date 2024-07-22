package com.example.crowdm.service.sse;

import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;
import com.example.crowdm.dto.message.MessageLogDto;


@Service
public class SseService {
    private final ApplicationEventPublisher eventPublisher;

    public SseService(ApplicationEventPublisher eventPublisher) {
        this.eventPublisher = eventPublisher;
    }

    public void logMessage(MessageLogDto messageLog) {
        // 메세지 로그 데이터 처리 로직...

        // 이벤트 발행
        eventPublisher.publishEvent(messageLog);
    }
}
