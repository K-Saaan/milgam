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

    /**
     * 1. MethodName: MessageManageEntity
     * 2. ClassName : MessageManageEntity
     * 3. Comment   : 메세지메니지 엔티티 설정
     * 4. 작성자    : been
     * 5. 작성일    : 2024. 07. 26
     **/
    @EmbeddedId
    private MessageManageId id;

    @Column(name = "confirm", nullable = false)
    private boolean confirm;

    @Column(name = "video_index", nullable = false)
    private int videoIndex;
}

