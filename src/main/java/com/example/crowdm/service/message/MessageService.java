package com.example.crowdm.service.message;

import com.example.crowdm.dto.message.MessageDto;
import com.example.crowdm.dto.message.MessageLogDto;
import com.example.crowdm.entity.message.MessageLogEntity;
import com.example.crowdm.entity.message.MessageManageEntity;
import com.example.crowdm.repository.message.MessageManageRepository;
import com.example.crowdm.repository.message.MessageLogRepository;
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
    private final MessageLogRepository messageLogRepository;

    //메니지먼트 dto 연결
    public List<MessageDto> getAllMessageManageEntities() {
        List<MessageManageEntity> entities = messageManageRepository.findAll();
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

    //메새지로그 dto 연결
    public List<MessageLogDto> getAllMessageLogEntities() {
        List<MessageLogEntity> entities = messageLogRepository.findAll();
        return entities.stream().map(this::convertToLogDto).collect(Collectors.toList());
    }
    public MessageLogDto convertToLogDto(MessageLogEntity entity) {
        MessageLogDto logDto = new MessageLogDto();
        logDto.setLogIndex(entity.getLogIndex());
        logDto.setDate(entity.getDate());
        logDto.setContext(entity.getContext());
        logDto.setContextTitle(entity.getContextTitle());
        logDto.setAnalysisIndex(entity.getAnalysisIndex());
        return logDto;
    }

    //유저 인덱스 항목 가져오기
    public List<MessageDto> getMessagesByUserIndex(List<MessageDto> messages, long userIndex) {
        return messages.stream()
                .filter(message -> message.getUserIndex() == userIndex)
                .collect(Collectors.toList());
    }
    // 로그인덱스 뽑아오기
    public List<Integer> getLogIndicesByUserIndex(List<MessageDto> messages, long userIndex) {
        return messages.stream()
                .filter(message -> message.getUserIndex() == userIndex)
                .map(MessageDto::getLogIndex)
                .collect(Collectors.toList());
    }

    //해당하는 log 가져오기
    public List<MessageLogDto> getMessageLogsByLogIndices(List<Integer> logIndices) {
        // 모든 메시지 로그 DTO를 가져옵니다.
        List<MessageLogDto> allDtos = getAllMessageLogEntities();
        // DTO를 logIndices를 사용해 필터링합니다.
        return allDtos.stream()
                .filter(dto -> logIndices.contains(dto.getLogIndex()))
                .collect(Collectors.toList());
    }
}
