package com.example.crowdm.service.message;

import com.example.crowdm.dto.message.MessageManageDto;
import com.example.crowdm.dto.message.MessageLogDto;
import com.example.crowdm.entity.id.MessageManageId;
import com.example.crowdm.entity.message.MessageLogEntity;
import com.example.crowdm.entity.message.MessageManageEntity;
import com.example.crowdm.repository.message.MessageManageRepository;
import com.example.crowdm.repository.message.MessageLogRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.example.crowdm.event.message.MessageLogEvent;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MessageService {
    private static final Logger logger = LoggerFactory.getLogger(MessageService.class);

    private final MessageManageRepository messageManageRepository;
    private final MessageLogRepository messageLogRepository;
    private final ApplicationEventPublisher eventPublisher;
    //메니지먼트 dto 연결
    public List<MessageManageDto> getAllMessageManageEntities() {
        List<MessageManageEntity> entities = messageManageRepository.findAll();
        List<MessageManageDto> dtos = entities.stream().map(this::convertToManageDto).collect(Collectors.toList());
        return dtos;
    }
    public MessageManageDto convertToManageDto(MessageManageEntity entity) {
        MessageManageDto dto = new MessageManageDto();
        dto.setUserIndex(entity.getId().getUserIndex());
        dto.setLogIndex(entity.getId().getLogIndex());
        dto.setConfirm(entity.isConfirm());
        dto.setVideoIndex(entity.getVideoIndex());
        return dto;
    }
    public MessageManageEntity convertToManageEntity(MessageManageDto dto) {
        return MessageManageEntity.builder()
                .id(new MessageManageId(dto.getUserIndex(), dto.getLogIndex()))
                .confirm(dto.isConfirm())
                .videoIndex(dto.getVideoIndex())
                .build();
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
    public MessageLogEntity convertToLogEntity(MessageLogDto dto) {
        return MessageLogEntity.builder()
                .logIndex(dto.getLogIndex())
                .date(dto.getDate())
                .context(dto.getContext())
                .contextTitle(dto.getContextTitle())
                .analysisIndex(dto.getAnalysisIndex())
                .build();
    }


    //유저 인덱스 항목 가져오기
    public List<MessageManageDto> getMessagesByUserIndex(List<MessageManageDto> messages, long userIndex) {
        return messages.stream()
                .filter(message -> message.getUserIndex() == userIndex)
                .collect(Collectors.toList());
    }
    // 로그인덱스 뽑아오기
    public List<Integer> getLogIndicesByUserIndex(List<MessageManageDto> messages, Integer userIndex) {
        return messages.stream()
                .filter(message -> message.getUserIndex() == userIndex)
                .map(MessageManageDto::getLogIndex)
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

    // 메세지매니지 업데이트 메서드
    public MessageManageDto updateMessageManage(MessageManageDto dto) {
        MessageManageId id = new MessageManageId(dto.getUserIndex(), dto.getLogIndex());
        MessageManageEntity entity = messageManageRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("No MessageManageEntity with given ID"));

        entity.setConfirm(dto.isConfirm());

        MessageManageEntity updatedEntity = messageManageRepository.save(entity);
        return convertToManageDto(updatedEntity);
    }

    //메세지 로그 저장
    public MessageLogDto saveMessageLog(MessageLogDto dto) {
        MessageLogEntity entity = convertToLogEntity(dto);
        MessageLogEntity savedEntity = messageLogRepository.save(entity);
        MessageLogDto savedDto = convertToLogDto(savedEntity);
        // 이벤트 발행
        logger.info("Publishing MessageLogEvent for logIndex: {}", savedDto.getLogIndex());
        eventPublisher.publishEvent(new MessageLogEvent(this, savedDto));

        return savedDto;
    }
    //메세지메니지 저장
    public MessageManageDto saveMessageManage(MessageManageDto dto) {
        MessageManageEntity entity = convertToManageEntity(dto);
        MessageManageEntity savedEntity = messageManageRepository.save(entity);
        return convertToManageDto(savedEntity);
    }
}
