//package com.example.crowdm.config;
//
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.stereotype.Component;
//import org.springframework.web.client.RestTemplate;
//import org.springframework.web.socket.BinaryMessage;
//import org.springframework.web.socket.CloseStatus;
//import org.springframework.web.socket.WebSocketSession;
//import org.springframework.web.socket.handler.BinaryWebSocketHandler;
//
//import java.io.IOException;
//import java.util.HashSet;
//import java.util.Set;
//import java.util.concurrent.CopyOnWriteArrayList;
//
//@Slf4j
//@Component
//@RequiredArgsConstructor
//public class VideoStreamHandler extends BinaryWebSocketHandler {
//    private Logger logger = LoggerFactory.getLogger(this.getClass());
//
////    private final RestTemplate restTemplate;
//    private final Set<WebSocketSession> sessions = new HashSet<>();
//
//    @Value("${server.gcp}")
//    String gcpUrl;
//
//    @Override
//    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
//        logger.info("------------------- {} connected", session.getId());
//        sessions.add(session);
//    }
//
//    @Override
//    protected void handleBinaryMessage(WebSocketSession session, BinaryMessage message) throws Exception {
//        try {
//            if (session.isOpen()) {
//                byte[] payload = message.getPayload().array();
//
////                restTemplate.postForObject(gcpUrl, payload, String.class);
//
//                session.sendMessage(new BinaryMessage("Chunk received".getBytes()));
//            }
//        } catch (IOException e) {
//            logger.error("handleBinaryMessage Error : {}", e);
//        }
//    }
//
//    @Override
//    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
//        logger.info("------------------- {} disconnected ", session.getId());
//        sessions.remove(session);
//    }
//}