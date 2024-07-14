package com.example.crowdm.service.dashboard;

import com.example.crowdm.entity.dashboard.MessagelogEntity;
import com.example.crowdm.entity.dashboard.MessageManageEntity;
import com.example.crowdm.repository.dashboard.MessagelogRepository;
import com.example.crowdm.repository.dashboard.MessageManageRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {

    //데이터 변경 요청
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final MessagelogRepository messagelogRepository;
    private final MessageManageRepository messageManageRepository;
    //final 변수: 초기화한 후 값을 변경될 수 없음

    public List<MessagelogEntity> findAllDashboards(){
        return messagelogRepository.findAll();
    }

    @Transactional
    public MessagelogEntity addDashboard(MessagelogEntity messagelogEntity) {
        MessagelogEntity savedEntity = messagelogRepository.save(messagelogEntity);

        // MessageManageEntity 생성 및 저장
        MessageManageEntity messageManageEntity = MessageManageEntity.create(savedEntity.getLog_index(), false);
        messageManageRepository.save(messageManageEntity);

        return savedEntity;

    }

    @Transactional
    public int deleteDashboard(Integer log_index){
        try{
            messagelogRepository.deleteById(log_index);
            return 1;
        }catch (Exception e){
            logger.error("Error: {}", e.getMessage());
            return 0;
        }
    }



    //sse알림
    private final List<SseEmitter> emitters = new ArrayList<>();

    public SseEmitter subscribe() {
        SseEmitter emitter = new SseEmitter(3600000L);
        synchronized (emitters) {
            emitters.add(emitter);
        }
        emitter.onCompletion(() -> removeEmitter(emitter));
        emitter.onTimeout(() -> removeEmitter(emitter));
        emitter.onError((e) -> removeEmitter(emitter));
        return emitter;
    }

    private void removeEmitter(SseEmitter emitter) {
        synchronized (emitters) {
            emitters.remove(emitter);
        }
    }

    public void sendNotification(String message) {
        synchronized (emitters) {
            List<SseEmitter> deadEmitters = new ArrayList<>();
            for (SseEmitter emitter : emitters) {
                try {
                    emitter.send(SseEmitter.event().data(message));
                } catch (IOException e) {
                    deadEmitters.add(emitter);
                }
            }
            emitters.removeAll(deadEmitters);
        }
    }
}

