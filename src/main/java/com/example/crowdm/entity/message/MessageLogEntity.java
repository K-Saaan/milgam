package com.example.crowdm.entity.message;

import lombok.*;
import javax.persistence.*;
import java.sql.Timestamp;
import java.util.Set;
import com.example.crowdm.entity.user.UserEntity;

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
    private int log_index;

    @Column(name = "date")
    private Timestamp date;

    @Column(name = "context")
    private String context;

    @Column(name = "context_title")
    private String contextTitle;

    @Column(name = "analysis_index")
    private int analysis_index;

    @ManyToMany(mappedBy = "messageManageEntities")
    private Set<UserEntity> userEntities;

    @ManyToMany
    @JoinTable(
            name = "message_management",
            joinColumns = @JoinColumn(name = "log_index"),
            inverseJoinColumns = @JoinColumn(name = "user_index")
    )
    private Set<MessageManageEntity> messageManageEntities;

}


