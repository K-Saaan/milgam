package com.example.crowdm.dto.video;

/**
 * 1. MethodName: Videoq
 * 2. ClassName : Videoq
 * 3. Comment   : 비디오 메타정보 dto
 * 4. 작성자    : boyeong
 * 5. 작성일    : 2024. 07. 16
 **/

public class Videoq {

    private String length;
    private String sector;
    private Integer camera_num;
    private String content;
    private String file_name;
    private Integer chunk_index;
    public Videoq() {}

    public Videoq(String length, String sector, Integer camera_num, String content, String file_name, Integer chunk_index) {
        this.length = length;
        this.sector = sector;
        this.camera_num = camera_num;
        this.content = content;
        this.file_name = file_name;
        this.chunk_index = chunk_index;
    }

    public String getLength() {
        return length;
    }

    public void setLength(String length) {
        this.length = length;
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

    public String getFile_name() {
        return file_name;
    }
    public void setFile_name(String file_name) {
        this.file_name = file_name;
    }

    public Integer getChunk_index() {
        return chunk_index;
    }

    public void setChunk_index(Integer chunk_index) {
        this.chunk_index = chunk_index;
    }
}
