package com.example.crowdm.controller.sse;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

import java.time.Duration;
import java.time.LocalTime;

@RestController
public class SseController {
    private final Sinks.Many<String> sink;

    public SseController() {
        this.sink = Sinks.many().multicast().onBackpressureBuffer();
    }

    @GetMapping(value = "/sse-stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> streamEvents() {
        return sink.asFlux();
    }

    public void sendEvent(String event) {
        sink.tryEmitNext(event);
    }
}