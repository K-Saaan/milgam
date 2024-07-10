package com.example.crowdm.dto.event;

import lombok.Getter;
import lombok.Setter;
import java.sql.Timestamp;

@Getter
@Setter
public class EventRequest {

    private int eventIndex;

    private String title;

    private Timestamp startDate;

    private Timestamp endDate;

    private String gu;

    private String dong;

    private String mapUrl;

    private String mapFeatures;

    private String content;

    private String accRole;

    private String hostOrg;
}