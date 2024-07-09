package com.example.crowdm.listener.dashboard;

import javax.persistence.PrePersist;
import javax.persistence.PreRemove;
import javax.persistence.PreUpdate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.crowdm.service.dashboard.DashboardService;

public class DashboardListener {

    private static DashboardService dashboardService;

    @Autowired
    public void setDashboardService(DashboardService dashboardService) {
        DashboardListener.dashboardService = dashboardService;
    }

    @PrePersist
    public void prePersist(Object entity) {
        // 데이터가 저장되기 전에 실행
        System.out.println("Entity is being created: " + entity);
        // 알림 로직 추가
        dashboardService.sendNotification("Dashboard Created: " + entity);
    }

    @PreUpdate
    public void preUpdate(Object entity) {
        // 데이터가 업데이트되기 전에 실행
        System.out.println("Entity is being updated: " + entity);
        // 알림 로직 추가
        dashboardService.sendNotification("Dashboard Updated: " + entity);
    }

    @PreRemove
    public void preRemove(Object entity) {
        // 데이터가 삭제되기 전에 실행
        System.out.println("Entity is being removed: " + entity);
        // 알림 로직 추가
        dashboardService.sendNotification("Dashboard Removed: " + entity);
    }
}
