package com.example.crowdm.entity.message;

import lombok.*;
import javax.persistence.*;
import java.util.Set;
import com.example.crowdm.entity.user.UserEntity;

@Getter
@Setter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "message_management", schema = "public")
public class MessageManageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_index")
    private int user_index;

    @Column(name = "confirm")
    private boolean confirm;

    @Column(name = "log_index")
    private int log_index;

    @Column(name = "video_index")
    private int video_index;

    @ManyToMany(mappedBy = "messageManageEntities")
    private Set<UserEntity> userEntities;

    @ManyToMany(mappedBy = "messageManageEntities")
    private Set<MessageLogEntity> dashboardEntities;

    public static MessageManageEntity create(int logIndex, boolean confirm) {
        MessageManageEntity entity = new MessageManageEntity();
        entity.setLog_index(logIndex);
        entity.setConfirm(confirm);
        return entity;
    }
}
