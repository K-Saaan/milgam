package com.example.crowdm.service.message;

import com.example.crowdm.dto.message.MessageDto;
import com.example.crowdm.entity.message.MessageManageEntity;
import com.example.crowdm.repository.message.MessageManageRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.Collections;

@Service
@RequiredArgsConstructor
public class MessageService {
    private static final Logger logger = LoggerFactory.getLogger(MessageService.class);

    private final MessageManageRepository messageManageRepository;

    public List<MessageDto> getAllMessageManageEntities() {
        List<MessageManageEntity> entities = messageManageRepository.findAll();
        return entities.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    public List<MessageDto> getMessageManageEntitiesByUserIndex(Long user_index) {
        List<MessageManageEntity> entities = messageManageRepository.findByUser_user_index(user_index);  // Use correct method
        if (entities.isEmpty()) {
            return Collections.emptyList();
        }
        return entities.stream().map(this::convertToDto).collect(Collectors.toList());
    }

    private MessageDto convertToDto(MessageManageEntity entity) {
        MessageDto dto = new MessageDto();
        dto.setUserIndex(entity.getId().getUserIndex());
        dto.setLogIndex(entity.getId().getLogIndex());
        dto.setConfirm(entity.isConfirm());
        dto.setVideoIndex(entity.getVideoIndex());
        return dto;
    }
}
