package com.example.crowdm.listener.dashboard;

import javax.persistence.PrePersist;
import javax.persistence.PreRemove;
import javax.persistence.PreUpdate;

import com.example.crowdm.service.dashboard.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

@Component
public class DashboardListener implements ApplicationContextAware {

    private static ApplicationContext applicationContext;

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) {
        DashboardListener.applicationContext = applicationContext;
    }

    private DashboardService getDashboardService() {
        return applicationContext.getBean(DashboardService.class);
    }

    @PrePersist
    public void prePersist(Object entity) {
        System.out.println("Entity is being created: " + entity);
        getDashboardService().sendNotification("Dashboard Created: " + entity);
    }

    @PreUpdate
    public void preUpdate(Object entity) {
        System.out.println("Entity is being updated: " + entity);
        getDashboardService().sendNotification("Dashboard Updated: " + entity);
    }

    @PreRemove
    public void preRemove(Object entity) {
        System.out.println("Entity is being removed: " + entity);
        getDashboardService().sendNotification("Dashboard Removed: " + entity);
    }
}
