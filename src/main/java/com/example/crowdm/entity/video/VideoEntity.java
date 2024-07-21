package com.example.crowdm.entity.video;

import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.sql.Timestamp;

@Getter
@Entity
@Builder
@DynamicUpdate
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "video", schema = "public")
public class VideoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "video_index")
    private int video_index;

    @Column(name = "date", nullable = false)
    private Timestamp date;

    @Column(name = "path", nullable = false, length = 100)
    private String path;

    @Column(name = "length", nullable = false, length=30)
    private String length;

    @Column(name = "gu", nullable = false, length = 30)
    private String gu;

    @Column(name = "dong", nullable = false, length = 30)
    private String dong;

    @Column(name = "sector", nullable = true, length = 5)
    private String sector;

    @Column(name = "camera_num", nullable = true)
    private Integer camera_num;

    @Column(name = "content", nullable = true)
    private String content;

    @Column(name = "uuid", nullable = false, length = 50)
    private String uuid;

    @Column(name = "user_index", nullable = false)
    private Integer user_index;

    @Column(name = "file_name", nullable = false)
    private String file_name;

    @Column(name = "chunk_index", nullable = false)
    private Integer chunk_index;


    public VideoEntity(Timestamp date, String path, String length, String gu, String dong, String sector, Integer camera_num, String content, String uuid, Integer user_index, String file_name, Integer chunk_index) {
        this.date = date;
        this.path = path;
        this.length = length;
        this.gu = gu;
        this.dong = dong;
        this.sector = sector;
        this.camera_num = camera_num;
        this.content = content;
        this.uuid = uuid;
        this.user_index = user_index;
        this.file_name=file_name;
        this.chunk_index=chunk_index;
    }

    public int getVideo_index() {
        return video_index;
    }

    public void setVideo_index(int video_index) {
        this.video_index = video_index;
    }

    public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getLength() {
        return length;
    }

    public void setLength(String length) {
        this.length = length;
    }

    public String getGu() {
        return gu;
    }

    public void setGu(String gu) {
        this.gu = gu;
    }

    public String getDong() {
        return dong;
    }

    public void setDong(String dong) {
        this.dong = dong;
    }

    public String getSector() {
        return sector;
    }

    public void setSector(String sector) {
        this.sector = sector;
    }

    public Integer getCamera_num() {
        return camera_num;
    }

    public void setCamera_num(Integer camera_num) {
        this.camera_num = camera_num;
    }

    public String getContent() {
        return content;
    }


    public void setContent(String content) {
        this.content = content;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }

    public Integer getUser_index() {
        return user_index;
    }

    public void setUser_index(Integer user_index) {
        this.user_index = user_index;
    }

    public void setFile_name(String file_name){
        this.file_name=file_name;
    }

    public String getFile_name(){
        return file_name;
    }
    public Integer getChunk_index() {
        return chunk_index;
    }
    public void setChunk_index(Integer chunk_index) {
        this.chunk_index = chunk_index;
    }


}
