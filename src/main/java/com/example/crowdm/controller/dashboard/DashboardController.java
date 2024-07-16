package com.example.crowdm.controller.dashboard;

import com.example.crowdm.entity.dashboard.DashboardEntity;
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
    public List<DashboardEntity> getAllDashboards() {
        logger.info("Fetching all dashboards");
        return dashboardService.findAllDashboards();
    }


    @PostMapping()
    public ResponseEntity<DashboardEntity> addDashboard(@RequestBody DashboardEntity dashboardEntity) {
        logger.info("Adding dashboard: {}", dashboardEntity);
        return ResponseEntity.ok(dashboardService.addDashboard(dashboardEntity));
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