package com.example.crowdm.entity.message;

import lombok.*;
import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Set;
import java.util.HashSet;

@Getter
@Setter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "message_log", schema = "public")
public class MessageLogEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "log_index")
    private int logIndex;

    @Column(name = "date")
    private Timestamp date;

    @Column(name = "context")
    private String context;

    @Column(name = "context_title")
    private String contextTitle;

    @Column(name = "analysis_index")
    private int analysisIndex;

    @OneToMany(mappedBy = "messageLog", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<MessageManageEntity> messageManageEntities = new HashSet<>();

}


