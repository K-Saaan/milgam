package com.example.crowdm.entity.message;

import lombok.*;
import javax.persistence.*;
import java.sql.Timestamp;

@Getter
@Setter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "message_log", schema = "public")
public class MessageLogEntity {

    /**
     * 1. MethodName: MessageLogEntity
     * 2. ClassName : MessageLogEntity
     * 3. Comment   : 메세지로그 엔티티 설정
     * 4. 작성자    : been
     * 5. 작성일    : 2024. 07. 26
     **/
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "log_index")
    private Integer logIndex;

    @Column(name = "date")
    private Timestamp date;

    @Column(name = "context")
    private String context;

    @Column(name = "context_title")
    private String contextTitle;

    @Column(name = "analysis_index")
    private int analysisIndex;
}


