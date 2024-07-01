package com.example.crowdm.controller.dashboard;

import com.example.crowdm.entity.dashboard.DashboardEntity;
//import com.example.crowdm.repository.dashboard.DashboardRepository;
import com.example.crowdm.service.dashboard.DashboardService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.DeleteMapping;

//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class DashboardController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final DashboardService dashboardService;

    @GetMapping("/hello")
    public String hello() {
        return "Hello World";
    }

    @GetMapping("/dashboards")
    public List<DashboardEntity> getAllDashboards() {
        logger.info("Fetching all dashboards");
        return dashboardService.findAllDashboards();
    }

    @DeleteMapping("/dashboards/delete{id}")
    public int deleteDashboard(@PathVariable Integer id) {
        logger.info("Deleting dashboard with id {}", id);
        return dashboardService.deleteUser(id);
    }
}
