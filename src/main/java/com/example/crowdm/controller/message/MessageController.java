package com.example.crowdm.controller.message;


import com.example.crowdm.dto.message.MessageManageDto;
import com.example.crowdm.dto.message.MessageLogDto;
import com.example.crowdm.service.message.MessageService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @GetMapping("/manage-all")
    public ResponseEntity<List<MessageManageDto>> getAllMessageManageEntities() {
        List<MessageManageDto> messageManageEntities = messageService.getAllMessageManageEntities();
        return ResponseEntity.ok(messageManageEntities);
    }

    @GetMapping("/log-all")
    public ResponseEntity<List<MessageLogDto>> getAllMessageLogEntities() {
        List<MessageLogDto> messageLogEntities = messageService.getAllMessageLogEntities();
        return ResponseEntity.ok(messageLogEntities);
    }

    @PostMapping()
    public ResponseEntity<MessageLogDto> createMessageLog(@RequestBody MessageLogDto messageLogDto, HttpServletRequest request) {
        Integer userIndex = getUserIndexFromSession(request);
        if (userIndex == null) {
//            return ResponseEntity.status(401).body(null);
            userIndex = 11;
        }

        MessageLogDto responseDto = messageService.saveMessageLog(messageLogDto);

        // MessageManageEntity도 추가
        MessageManageDto messageManageDto = new MessageManageDto();
        messageManageDto.setUserIndex(userIndex);  // 예시: 로그 인덱스를 사용자 인덱스로 사용
        messageManageDto.setLogIndex(responseDto.getLogIndex());
        messageManageDto.setConfirm(false);  // 기본값 설정
        messageManageDto.setVideoIndex(0);   // 기본값 설정
        messageService.saveMessageManage(messageManageDto);

        return ResponseEntity.ok(responseDto);
    }

    @PatchMapping("/update")
    public ResponseEntity<MessageManageDto> updateMessageManage(@RequestBody MessageManageDto messageManageDto, HttpServletRequest request) {
        Integer userIndex = getUserIndexFromSession(request);
        if (userIndex == null) {
//            return ResponseEntity.status(401).body(null);
            userIndex = 11;
        }
        // DTO에 사용자 인덱스 설정
        messageManageDto.setUserIndex(userIndex);
        messageManageDto.setConfirm(true);

        // 서비스 메서드를 호출하여 엔티티 업데이트
        MessageManageDto updatedDto = messageService.updateMessageManage(messageManageDto);

        return ResponseEntity.ok(updatedDto);
    }
    //특정유저 메세지 가저오기
    @GetMapping("/user/message-logs")
    public ResponseEntity<List<MessageLogDto>> getMessageLogsByUserIndex(HttpServletRequest request) {
        Integer userIndex = getUserIndexFromSession(request);
        if (userIndex == null) {
//            return ResponseEntity.status(401).body(null);
            userIndex = 11;
        }
        List<Integer> logIndices = filterLogIndicesByUserIndex(userIndex);
        List<MessageLogDto> messageLogs = messageService.getMessageLogsByLogIndices(logIndices);
        return ResponseEntity.ok(messageLogs);
    }

    //세션에서 유저인덱스 받아오기
    private Integer getUserIndexFromSession(HttpServletRequest request) {
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

        return userIndexInt;
    }

    //유저인덱스를 기준으로 메시지를 필터링 함
    private List<MessageManageDto> filterMessagesByUserIndex(Integer userIndex) {
        List<MessageManageDto> allMessages = messageService.getAllMessageManageEntities();
        return allMessages.stream()
                .filter(message -> message.getUserIndex() == userIndex)
                .collect(Collectors.toList());
    }
    //유저인덱스를 기준으로 로그를 필터링 함
    private List<Integer> filterLogIndicesByUserIndex(Integer userIndex) {
        List<MessageManageDto> allMessages = messageService.getAllMessageManageEntities();
        return allMessages.stream()
                .filter(message -> message.getUserIndex() == userIndex)
                .map(MessageManageDto::getLogIndex)
                .collect(Collectors.toList());
    }
}