package com.example.crowdm.controller.message;

import com.example.crowdm.dto.message.MessageDto;
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

@RequiredArgsConstructor
@RestController
@RequestMapping("/dashboards")
public class MessageController {
    private static final Logger logger = LoggerFactory.getLogger(MessageController.class);

    private final MessageService messageService;

    @GetMapping()
    public ResponseEntity<List<MessageDto>> getAllMessageManageEntities() {
        List<MessageDto> messageManageEntities = messageService.getAllMessageManageEntities();
        return ResponseEntity.ok(messageManageEntities);
    }
    @GetMapping("/user-messages")

    public ResponseEntity<List<MessageDto>> getUserMessageManageEntities(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null) {
            logger.error("session is null");
            return ResponseEntity.status(401).build();
        }

        Integer userIndex = (Integer) session.getAttribute("userIndex");
        if (userIndex == null) {
            logger.error("userIndex is null");
            return ResponseEntity.status(401).build();
        }
        logger.info("Session found. userIndex: {}", userIndex);
//        List<MessageDto> messageManageEntities = messageService.getMessageManageEntitiesByUserIndex(userIndex);
//        return ResponseEntity.ok(messageManageEntities);
        return ResponseEntity.status(200).build();

    }
}