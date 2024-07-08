package com.example.crowdm.service.dashboard;

import com.example.crowdm.entity.dashboard.DashboardEntity;
import com.example.crowdm.repository.dashboard.DashboardRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.sql.Timestamp;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DashboardService {

    //데이터 변경 요청
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final DashboardRepository dashboardRepository;
    //final 변수: 초기화한 후 값을 변경될 수 없음

    public List<DashboardEntity> findAllDashboards(){
        return dashboardRepository.findAll();
    }

    @Transactional
    public DashboardEntity addDashboard(DashboardEntity dashboardEntity) {
        return dashboardRepository.save(dashboardEntity);
    }

    public DashboardEntity updateDashboardEntityOnly(int id, DashboardEntity dashboardEntity) {
        Optional<DashboardEntity> optionalDashboard = dashboardRepository.findById(id);
        if (optionalDashboard.isPresent()) {
            DashboardEntity existingDashboard = optionalDashboard.get();
            existingDashboard.setDate(dashboardEntity.getDate());
            existingDashboard.setContext(dashboardEntity.getContext());
            existingDashboard.setContextTitle(dashboardEntity.getContextTitle());
            existingDashboard.setAnalysis_index(dashboardEntity.getAnalysis_index());
            return existingDashboard;
        } else {
            throw new RuntimeException("Dashboard not found with id " + id);
        }
    }

    @Transactional
    public int deleteDashboard(Integer log_index){
        try{
            dashboardRepository.deleteById(log_index);
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

