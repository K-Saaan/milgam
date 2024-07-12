package com.example.crowdm.listener.dashboard;

import javax.persistence.PostPersist;
import javax.persistence.PreRemove;
import javax.persistence.PreUpdate;

import com.example.crowdm.service.dashboard.DashboardService;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;
import org.springframework.lang.NonNull;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.core.JsonProcessingException;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class DashboardListener implements ApplicationContextAware {

    private static ApplicationContext applicationContext;
    private static final ObjectMapper objectMapper = new ObjectMapper()
            .registerModule(new JavaTimeModule())
            .disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
    private static final Logger logger = LoggerFactory.getLogger(DashboardListener.class);

    @Override
    public void setApplicationContext(@NonNull ApplicationContext applicationContext) {
        DashboardListener.applicationContext = applicationContext;
    }

    private DashboardService getDashboardService() {
        return applicationContext.getBean(DashboardService.class);
    }

    private String convertEntityToJson(Object entity) {
        try {
            return objectMapper.writeValueAsString(entity);
        } catch (JsonProcessingException e) {
            logger.error("Error converting entity to JSON", e);
            return "Error converting entity to JSON";
        }
    }

    @PostPersist
    public void postPersist(Object entity) {
        logger.info("Entity has been created: {}", entity);
        String entityJson = convertEntityToJson(entity);
        getDashboardService().sendNotification("Dashboard Created: " + entityJson);
    }

    @PreUpdate
    public void preUpdate(Object entity) {
        logger.info("Entity is being updated: {}", entity);
        String entityJson = convertEntityToJson(entity);
        getDashboardService().sendNotification("Dashboard Updated: " + entityJson);
    }

    @PreRemove
    public void preRemove(Object entity) {
        logger.info("Entity is being removed: {}", entity);
        String entityJson = convertEntityToJson(entity);
        getDashboardService().sendNotification("Dashboard Removed: " + entityJson);
    }

}
