package com.example.crowdm.entity.message;

import com.example.crowdm.entity.id.MessageManageId;
import lombok.*;
import javax.persistence.*;

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

    @Column(name = "confirm", nullable = false)
    private boolean confirm;

    @Column(name = "video_index", nullable = false)
    private int videoIndex;
}

