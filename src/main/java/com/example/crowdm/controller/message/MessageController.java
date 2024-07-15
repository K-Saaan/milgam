package com.example.crowdm.controller.message;

import com.example.crowdm.dto.message.MessageDto;
import com.example.crowdm.dto.message.MessageLogDto;
import com.example.crowdm.entity.message.MessageLogEntity;
import com.example.crowdm.entity.message.MessageManageEntity;
import com.example.crowdm.service.message.MessageService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/dashboards")
public class MessageController {
    private static final Logger logger = LoggerFactory.getLogger(MessageController.class);

    private final MessageService messageService;

    @GetMapping("/all")
    public ResponseEntity<List<MessageDto>> getAllMessageManageEntities() {
        List<MessageDto> messageManageEntities = messageService.getAllMessageManageEntities();
        return ResponseEntity.ok(messageManageEntities);
    }
    @GetMapping("/user/messages")
    public  ResponseEntity<List<MessageDto>> getMessagesByUserIndex(HttpServletRequest request){
        HttpSession session = request.getSession();
        if(session.getAttribute("userIndex") != null) {
            logger.info("session null");
        }
        Integer userIndexInt = (Integer) session.getAttribute("userIndex");
        logger.info("user_indexint", userIndexInt);

        Long userIndex = userIndexInt != null ? userIndexInt.longValue() : null;
        logger.info("user_index", userIndex);

        List<MessageDto> allMessages = messageService.getAllMessageManageEntities();
        List<MessageDto> fillteredMessages = allMessages.stream()
                .filter(message -> message.getUserIndex() == userIndex)
                .collect(Collectors.toList());
        return ResponseEntity.ok(fillteredMessages);
    }

    @GetMapping("/{userIndex}/log-indices")
    public ResponseEntity<List<Integer>> getLogIndicesByUserIndex(@PathVariable long userIndex) {
        List<MessageDto> allMessages = messageService.getAllMessageManageEntities();
        List<Integer> logIndices = allMessages.stream()
                .filter(message -> message.getUserIndex() == userIndex)
                .map(MessageDto::getLogIndex) // Assuming getLogIndex() returns Integer
                .collect(Collectors.toList());
        return ResponseEntity.ok(logIndices);
    }

    @GetMapping("/log-all")
    public ResponseEntity<List<MessageLogDto>> getAllMessageLogEntities() {
        List<MessageLogDto> messageLogEntities = messageService.getAllMessageLogEntities();
        return ResponseEntity.ok(messageLogEntities);
    }
    @GetMapping("/{userIndex}/message-logs")
    public ResponseEntity<List<MessageLogDto>> getMessageLogsByUserIndex(@PathVariable long userIndex) {
        List<MessageDto> allMessages = messageService.getAllMessageManageEntities();
        List<Integer> logIndices = allMessages.stream()
                .filter(message -> message.getUserIndex() == userIndex)
                .map(MessageDto::getLogIndex)
                .collect(Collectors.toList());
        List<MessageLogDto> messageLogs = messageService.getMessageLogsByLogIndices(logIndices);
        return ResponseEntity.ok(messageLogs);
    }
}