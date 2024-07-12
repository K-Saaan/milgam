package com.example.crowdm.controller.dashboard;

import com.example.crowdm.entity.dashboard.MessagelogEntity;
import com.example.crowdm.entity.dashboard.MessageManageEntity;
import com.example.crowdm.service.dashboard.DashboardService;
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
public class DashboardController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final DashboardService dashboardService;

    @GetMapping
    public List<MessagelogEntity> getAllDashboards() {
        logger.info("Fetching all dashboards");
        return dashboardService.findAllDashboards();
    }

//    @GetMapping
//    public List<MessageManageEntity> getAllDashboards() {
//        logger.info("Fetching all dashboards");
//        return dashboardService.findAllDashboards();
//    }


    @PostMapping()
    public ResponseEntity<MessagelogEntity> addDashboard(@RequestBody MessagelogEntity messagelogEntity) {
        logger.info("Adding dashboard: {}", messagelogEntity);
        return ResponseEntity.ok(dashboardService.addDashboard(messagelogEntity));
    }

    @DeleteMapping("/delete/{id}")
    public int deleteDashboard(@PathVariable("id") int id ){
        logger.info("Deleting dashboard with id {}", id);
        return dashboardService.deleteDashboard(id);
    }

    @GetMapping("/noti")
    public SseEmitter getDashboards() {
        logger.info("Subscribing to dashboard notifications");
        return dashboardService.subscribe();
    }
}
