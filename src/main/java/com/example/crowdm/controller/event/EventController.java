package com.example.crowdm.controller.event;

import com.example.crowdm.dto.event.EventRequest;
import com.example.crowdm.dto.login.LoginRequest;
import com.example.crowdm.entity.dashboard.DashboardEntity;
import com.example.crowdm.entity.event.EventEntity;
import com.example.crowdm.repository.event.EventRepository;
import com.example.crowdm.service.event.EventService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.crypto.BadPaddingException;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.UnsupportedEncodingException;
import java.security.InvalidAlgorithmParameterException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@RequestMapping("/event")
public class EventController {

    private Logger logger = LoggerFactory.getLogger(this.getClass());
    private final EventRepository eventRepository;
    private final EventService eventService;

    /**
     * 1. MethodName: goLoginPage
     * 2. ClassName : LoginController
     * 3. Comment   : 로그인페이지 이동
     * 4. 작성자    : san
     * 5. 작성일    : 2024. 06. 24
     **/
    @GetMapping("/eventlist")
    public ResponseEntity<List<EventEntity>> goeventPage(HttpServletRequest request, HttpServletResponse response, Model model) {

        // 예시 코드
        List<EventEntity> eventList = eventService.findAllEvent();
        System.out.println("=====================================찡긋^^==================================");
        System.out.println("Events : " + eventList.size());
        System.out.println("EventsList : " + eventList);

        // 로깅을 이용하여 이벤트 목록 정보 출력
        logger.info("이벤트 수: {}", eventList.size());
        logger.debug("이벤트 목록: {}", eventList);

        // 모델에 이벤트 목록 추가
        model.addAttribute("eventList", eventList);

        return ResponseEntity.ok(eventList);
    }

    @PostMapping(value = "/eventadd")
    public  ResponseEntity addEvent(@RequestBody EventEntity eventEntity) {
        logger.info("Adding Event: {}", eventEntity);

        return ResponseEntity.ok(eventService.addEvent(eventEntity));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity deleteEvent(@PathVariable("id") int id ){
        logger.info("Deleting event with id {}", id);
        return ResponseEntity.ok(eventService.deleteEvent(id));
    }
}
