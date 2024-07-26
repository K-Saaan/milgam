package com.example.crowdm.event.message;

import com.example.crowdm.dto.message.MessageLogDto;
import org.springframework.context.ApplicationEvent;

public class MessageLogEvent extends ApplicationEvent {
    private final transient MessageLogDto messageLogDto;

    /**
     * 1. MethodName: MessageLogEvent
     * 2. ClassName : MessageLogEvent
     * 3. Comment   : 메시지 로그 이벤트를 나타내는 데 사용
     * 4. 작성자    : been
     * 5. 작성일    : 2024. 07. 26
     **/
    public MessageLogEvent(Object source, MessageLogDto messageLogDto) {
        super(source);
        this.messageLogDto = messageLogDto;
    }

    public MessageLogDto getMessageLogDto() {
        return messageLogDto;
    }
}
