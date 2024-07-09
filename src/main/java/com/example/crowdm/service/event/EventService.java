package com.example.crowdm.service.event;


import com.example.crowdm.entity.event.EventEntity;
import com.example.crowdm.repository.event.EventRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EventService {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    private final EventRepository eventRepository;

    public List<EventEntity> findAllEvent(){
        List<EventEntity> eventList = eventRepository.findAll();
        return eventList;
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
