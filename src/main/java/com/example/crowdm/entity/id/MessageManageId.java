package com.example.crowdm.entity.id;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Embeddable
public class MessageManageId implements Serializable {

    private int userIndex;
    private int logIndex;

    // 기본 생성자
    public MessageManageId() {}

    // 매개변수 있는 생성자
    public MessageManageId(int userIndex, int logIndex) {
        this.userIndex = userIndex;
        this.logIndex = logIndex;
    }

    // Getters and Setters
    public int getUserIndex() {
        return userIndex;
    }

    public void setUserIndex(int userIndex) {
        this.userIndex = userIndex;
    }

    public int getLogIndex() {
        return logIndex;
    }

    public void setLogIndex(int logIndex) {
        this.logIndex = logIndex;
    }

    // hashCode and equals 메서드 재정의
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MessageManageId that = (MessageManageId) o;
        return userIndex == that.userIndex && logIndex == that.logIndex;
    }

    @Override
    public int hashCode() {
        return Objects.hash(userIndex, logIndex);
    }
}