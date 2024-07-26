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
import java.util.Objects;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/dashboards")
public class MessageController {
    private static final Logger logger = LoggerFactory.getLogger(MessageController.class);

    private final MessageService messageService;

    /**
     * 1. MethodName: getAllMessageManageEntities
     * 2. ClassName : MessageController
     * 3. Comment   : 매니지먼트 전체 목록 가져오기
     * 4. 작성자    : been
     * 5. 작성일    : 2024. 07. 26
     **/
    //
    @GetMapping("/manage-all")
    public ResponseEntity<List<MessageManageDto>> getAllMessageManageEntities() {
        List<MessageManageDto> messageManageEntities = messageService.getAllMessageManageEntities();
        return ResponseEntity.ok(messageManageEntities);
    }

    /**
     * 1. MethodName: getAllMessageLogEntities
     * 2. ClassName : MessageController
     * 3. Comment   : 매시지로그 전체 목록 가져오기
     * 4. 작성자    : been
     * 5. 작성일    : 2024. 07. 26
     **/
    @GetMapping("/log-all")
    public ResponseEntity<List<MessageLogDto>> getAllMessageLogEntities() {
        List<MessageLogDto> messageLogEntities = messageService.getAllMessageLogEntities();
        return ResponseEntity.ok(messageLogEntities);
    }

    /**
     * 1. MethodName: createMessageLog
     * 2. ClassName : MessageController
     * 3. Comment   : 매세지 로그에 데이터 추가
     * 4. 작성자    : been
     * 5. 작성일    : 2024. 07. 26
     **/
    @PostMapping()
    public ResponseEntity<MessageLogDto> createMessageLog(@RequestBody MessageLogDto messageLogDto, HttpServletRequest request) {
        Integer userIndex = getUserIndexFromSession(request);
        if (userIndex == null) {
            return ResponseEntity.status(401).body(null);
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

    /**
     * 1. MethodName: updateMessageManage
     * 2. ClassName : MessageController
     * 3. Comment   : 매니지먼트 컨펌 업데이트
     * 4. 작성자    : been
     * 5. 작성일    : 2024. 07. 26
     **/
    @PatchMapping("/update")
    public ResponseEntity<MessageManageDto> updateMessageManage(@RequestBody MessageManageDto messageManageDto, HttpServletRequest request) {
        Integer userIndex = getUserIndexFromSession(request);
        if (userIndex == null) {
            return ResponseEntity.status(401).body(null);
        }
        // DTO에 사용자 인덱스 설정
        messageManageDto.setUserIndex(userIndex);
        messageManageDto.setConfirm(true);

        // 서비스 메서드를 호출하여 엔티티 업데이트
        MessageManageDto updatedDto = messageService.updateMessageManage(messageManageDto);

        return ResponseEntity.ok(updatedDto);
    }
    //특정유저 메세지 가저오기

    /**
     * 1. MethodName: getMessageLogsByUserIndex
     * 2. ClassName : MessageController
     * 3. Comment   : 특정 유저 매니지로그 전체 목록 가져오기
     * 4. 작성자    : been
     * 5. 작성일    : 2024. 07. 26
     **/
    @GetMapping("/user/message-logs")
    public ResponseEntity<List<MessageLogDto>> getMessageLogsByUserIndex(HttpServletRequest request) {
        Integer userIndex = getUserIndexFromSession(request);
        if (userIndex == null) {
            return ResponseEntity.status(401).body(null);
        }
        List<Integer> logIndices = filterLogIndicesByUserIndex(userIndex);
        List<MessageLogDto> messageLogs = messageService.getMessageLogsByLogIndices(logIndices);
        return ResponseEntity.ok(messageLogs);
    }

    /**
     * 1. MethodName: getUserIndexFromSession
     * 2. ClassName : MessageController
     * 3. Comment   : 세션에서 유저인덱스 받아오기
     * 4. 작성자    : been
     * 5. 작성일    : 2024. 07. 26
     **/
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

    /**
     * 1. MethodName: filterLogIndicesByUserIndex
     * 2. ClassName : MessageController
     * 3. Comment   : 유저인덱스를 기준으로 로그를 필터링 함
     * 4. 작성자    : been
     * 5. 작성일    : 2024. 07. 26
     **/
    private List<Integer> filterLogIndicesByUserIndex(Integer userIndex) {
        List<MessageManageDto> allMessages = messageService.getAllMessageManageEntities();
        return allMessages.stream()
                .filter(message -> Objects.equals(message.getUserIndex(), userIndex))
                .map(MessageManageDto::getLogIndex)
                .collect(Collectors.toList());
    }
}