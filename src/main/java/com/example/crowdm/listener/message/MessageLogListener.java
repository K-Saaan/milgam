package com.example.crowdm.listener.message;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import com.example.crowdm.controller.sse.SseController;
import com.example.crowdm.event.message.MessageLogEvent;

@Component
public class MessageLogListener {
    private final SseController sseController;

    @Autowired
    public MessageLogListener(SseController sseController) {
        this.sseController = sseController;
    }


    /**
     * 1. MethodName: handleMessageLogEvent
     * 2. ClassName : MessageLogListener
     * 3. Comment   : 메시지 로그 이벤트가 발생했을 때, SseController를 통해 연결된 클라이언트들에게 메시지를 전송
     * 4. 작성자    : been
     * 5. 작성일    : 2024. 07. 26
     **/
    @EventListener
    public void handleMessageLogEvent(MessageLogEvent event) {
        sseController.sendMessageToClients(event.getMessageLogDto());
    }
}
