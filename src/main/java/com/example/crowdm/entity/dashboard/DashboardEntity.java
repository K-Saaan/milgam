package com.example.crowdm.entity.dashboard;


import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

@Getter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "message_log", schema="public")

public class DashboardEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "log_index")
    private int log_index;

    @Column(name = "date")
    private Timestamp date;

    @Column(name = "context")
    private String context;

    @Column(name = "context_title")
    private String contextTitle;

    @Column(name = "analysis_index")
    private int analysis_index;


}
