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

    //전체 목록 가져오기
    @GetMapping("/all")
    public ResponseEntity<List<MessageDto>> getAllMessageManageEntities() {
        List<MessageDto> messageManageEntities = messageService.getAllMessageManageEntities();
        return ResponseEntity.ok(messageManageEntities);
    }

    @GetMapping("/log-all")
    public ResponseEntity<List<MessageLogDto>> getAllMessageLogEntities() {
        List<MessageLogDto> messageLogEntities = messageService.getAllMessageLogEntities();
        return ResponseEntity.ok(messageLogEntities);
    }

    //특정 유저 메세지 가져오기
    @GetMapping("/user/messages")
    public ResponseEntity<List<MessageDto>> getMessagesByUserIndex(HttpServletRequest request) {
        Long userIndex = getUserIndexFromSession(request);
        if (userIndex == null) {
//            return ResponseEntity.status(401).body(null);
            userIndex = 11L;
        }

        List<MessageDto> filteredMessages = filterMessagesByUserIndex(userIndex);
        return ResponseEntity.ok(filteredMessages);
    }
    //특정 유저 메세지로그 목록 가져오기
    @GetMapping("/user/log-indices")
    public ResponseEntity<List<Integer>> getLogIndicesByUserIndex(HttpServletRequest request) {
        Long userIndex = getUserIndexFromSession(request);
        if (userIndex == null) {
//            return ResponseEntity.status(401).body(null);
            userIndex = 11L;
        }

        List<Integer> logIndices = filterLogIndicesByUserIndex(userIndex);
        return ResponseEntity.ok(logIndices);
    }

    //특정유저 메세지 가저오기
    @GetMapping("/user/message-logs")
    public ResponseEntity<List<MessageLogDto>> getMessageLogsByUserIndex(HttpServletRequest request) {
        Long userIndex = getUserIndexFromSession(request);
        if (userIndex == null) {
//            return ResponseEntity.status(401).body(null);
            userIndex = 11L;
        }

        List<Integer> logIndices = filterLogIndicesByUserIndex(userIndex);
        List<MessageLogDto> messageLogs = messageService.getMessageLogsByLogIndices(logIndices);
        return ResponseEntity.ok(messageLogs);
    }

    //세션에서 유저인덱스 받아오기
    private Long getUserIndexFromSession(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            logger.info("No session found.");
            return null;
        }
        Integer userIndexInt = (Integer) session.getAttribute("userIndex");
        if (userIndexInt == null) {
            logger.info("userIndex attribute is null.");
            return null;
        }

        return userIndexInt.longValue();
    }

    //유저인덱스를 기준으로 메시지를 필터링 함
    private List<MessageDto> filterMessagesByUserIndex(Long userIndex) {
        List<MessageDto> allMessages = messageService.getAllMessageManageEntities();
        return allMessages.stream()
                .filter(message -> message.getUserIndex() == userIndex)
                .collect(Collectors.toList());
    }
    //유저인덱스를 기준으로 로그를 필터링 함
    private List<Integer> filterLogIndicesByUserIndex(Long userIndex) {
        List<MessageDto> allMessages = messageService.getAllMessageManageEntities();
        return allMessages.stream()
                .filter(message -> message.getUserIndex() == userIndex)
                .map(MessageDto::getLogIndex)
                .collect(Collectors.toList());
    }
}