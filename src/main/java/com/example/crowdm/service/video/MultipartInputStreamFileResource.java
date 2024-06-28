package com.example.crowdm.service.video;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;

import java.io.IOException;
import java.io.InputStream;

public class MultipartInputStreamFileResource extends InputStreamResource {
    private final String fileName;

    MultipartInputStreamFileResource(InputStream inputStream, String fileName) {
        super(inputStream);
        this.fileName = fileName;
    }

    @Override
    public String getFilename() {
        return this.fileName;
    }

    @Override
    public long contentLength() throws IOException {
        return -1;
    }

}
