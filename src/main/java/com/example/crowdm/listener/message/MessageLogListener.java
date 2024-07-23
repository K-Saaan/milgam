package com.example.crowdm.listener.message;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import com.example.crowdm.controller.sse.SseController;
import com.example.crowdm.event.message.MessageLogEvent;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class MessageLogListener {
    private static final Logger logger = LoggerFactory.getLogger(MessageLogListener.class);
    private final SseController sseController;

    @Autowired
    public MessageLogListener(SseController sseController) {
        this.sseController = sseController;
    }

    @EventListener
    public void handleMessageLogEvent(MessageLogEvent event) {
        sseController.sendMessageToClients(event.getMessageLogDto());
    }
}
