package com.example.crowdm.service.event;


import com.example.crowdm.entity.event.EventEntity;
import com.example.crowdm.repository.event.EventRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.sql.Timestamp;
import java.time.Instant;

@Service
@RequiredArgsConstructor
public class EventService {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    private final EventRepository eventRepository;

    public List<EventEntity> findAllEvent(){
        Timestamp now = Timestamp.from(Instant.now());
        List<EventEntity> eventList = eventRepository.findEventsWithinCurrentTime(now);
        return eventList;
    }



    public EventEntity addEvent(EventEntity eventEntity) {

        // Null 체크
        if (eventEntity.getTitle() == null || eventEntity.getTitle().isEmpty() ||
                eventEntity.getStart_date() == null ||
                eventEntity.getEnd_date() == null ||
                eventEntity.getGu() == null || eventEntity.getGu().isEmpty() ||
                eventEntity.getDong() == null || eventEntity.getDong().isEmpty()) {

            throw new IllegalArgumentException("EventEntity fields must not be null or empty");
        }

        return eventRepository.save(eventEntity);
    }

    @Transactional
    public int deleteEvent(Integer event_index){
        try{
            eventRepository.deleteById(event_index);
            return 1;
        }catch (Exception e){
            logger.error("Error: {}", e.getMessage());
            return 0;
        }
    }

//    @Transactional
//    public int deleteUser(int user_index) {
//        try {
//            loginRepository.deleteById(user_index);
//            return 1;
//        }catch (Exception e){
//            logger.error("error : ", e.getMessage());
//            return 0;
//        }
//    }
}
