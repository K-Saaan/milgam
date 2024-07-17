package com.example.crowdm.entity.event;

import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

@Getter
@Setter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "event", schema="public")
public class EventEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "event_index")
    private int event_index;

    @Column(name = "title", length = 100, nullable = false)
    private String title;

    @Column(name = "start_date", nullable = false)
    private Timestamp start_date;

    @Column(name = "end_date", nullable = false)
    private Timestamp end_date;

    @Column(name = "gu", length = 30, nullable = false )
    private String gu;

    @Column(name = "dong", length = 30, nullable = false)
    private String dong;

    @Column(name = "map_url", length = 384)
    private String map_url;

    @Column(name = "map_features", columnDefinition = "TEXT")
    private String map_features;

    @Column(name = "content", columnDefinition = "TEXT")
    private String content;

    @Column(name = "acc_role", length = 30)
    private String acc_role;

    @Column(name = "host_org", length = 100)
    private String host_org;

}
