package com.example.crowdm.controller.message;

import com.example.crowdm.dto.message.MessageDto;
import com.example.crowdm.entity.message.MessageManageEntity;
import com.example.crowdm.service.message.MessageService;
import org.springframework.http.ResponseEntity;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

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
}