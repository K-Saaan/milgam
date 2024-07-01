package com.example.crowdm.service.dashboard;

import com.example.crowdm.entity.dashboard.DashboardEntity;
import com.example.crowdm.repository.dashboard.DashboardRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final DashboardRepository dashboardRepository;
    //final 변수: 초기화한 후 값을 변경될 수 없음

    public List<DashboardEntity> findAllDashboards(){
        return dashboardRepository.findAll();
    }

    @Transactional
    public int deleteUser(Integer log_index){
        try{
            dashboardRepository.deleteById(log_index);
            return 1;
        }catch (Exception e){
            logger.error("Error: {}", e.getMessage());
            return 0;
        }

    }
}

