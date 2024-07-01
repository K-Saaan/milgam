package com.example.crowdm.controller.dashboard;

import com.example.crowdm.entity.dashboard.DashboardEntity;
import com.example.crowdm.repository.dashboard.DashboardRepository;
import com.example.crowdm.service.dashboard.DashboardService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
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

    @PostMapping("/add")
    public DashboardEntity addDashboard(@RequestBody DashboardEntity dashboardEntity) {
        logger.info("Adding dashboard: {}", dashboardEntity);
        return dashboardService.addDashboard(dashboardEntity);
    }

    @DeleteMapping("/delete{id}")
    public int deleteDashboard(@PathVariable Integer id) {
        logger.info("Deleting dashboard with id {}", id);
        return dashboardService.deleteUser(id);
    }
}
