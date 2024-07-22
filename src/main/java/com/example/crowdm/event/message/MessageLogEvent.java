package com.example.crowdm.event.message;

import com.example.crowdm.dto.message.MessageLogDto;
import org.springframework.context.ApplicationEvent;

public class MessageLogEvent extends ApplicationEvent {
    private final MessageLogDto messageLogDto;

    public MessageLogEvent(Object source, MessageLogDto messageLogDto) {
        super(source);
        this.messageLogDto = messageLogDto;
    }

    public MessageLogDto getMessageLogDto() {
        return messageLogDto;
    }
}
