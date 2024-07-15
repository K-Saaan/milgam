package com.example.crowdm.entity.message;

import lombok.*;
import javax.persistence.*;
import com.example.crowdm.entity.user.UserEntity;
import com.example.crowdm.entity.id.MessageManageId;

@Getter
@Setter
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "message_management", schema = "public")
public class MessageManageEntity {
    @EmbeddedId
    private MessageManageId id;

    @ManyToOne
    @MapsId("userIndex")
    @JoinColumn(name = "user_index", nullable = false)
    private UserEntity user;

    @ManyToOne
    @MapsId("logIndex")
    @JoinColumn(name = "log_index", nullable = false)
    private MessageLogEntity messageLog;

    @Column(name = "confirm", nullable = false)
    private boolean confirm;

    @Column(name = "video_index", nullable = false)
    private int videoIndex;
}

