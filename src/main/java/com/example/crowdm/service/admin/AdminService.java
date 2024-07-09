package com.example.crowdm.service.admin;

import com.example.crowdm.dto.faq.MailDto;
import com.example.crowdm.dto.faq.MyqList;

import com.example.crowdm.dto.faq.UnlockList;
import com.example.crowdm.dto.user.PermissionList;
import com.example.crowdm.entity.admin.MyqEntity;

import com.example.crowdm.entity.user.UserEntity;
import com.example.crowdm.repository.admin.MyqRepository;
import com.example.crowdm.repository.login.LoginRepository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import org.springframework.transaction.annotation.Transactional;
import java.sql.Timestamp;

import java.util.Optional;



@Service
@RequiredArgsConstructor
public class AdminService {
    //private Logger logger = LoggerFactory.getLogger(this.getClass());
    //private static final Logger logger2 = Logger.getLogger(AdminService.class.getName());
    private final LoginRepository loginRepository;
    private final MyqRepository myqRepository;
    private EmailService emailService;
    private MailDto email;
    private JavaMailSender mailSender;
    private static final String FROM_ADDRESS = "aivleteam12@gmail.com";

    private static final Logger logger = LoggerFactory.getLogger(AdminService.class);
    public List<UserEntity> showAllUser() {
        List<UserEntity> userList = loginRepository.findAll();
        return userList;
    }


    //@Transactional
    //public int permissionUpdateUser(int user_index) {
    //logger.info("permissionUpdateUser {}", user_index);
    //
    //Optional<UserEntity> user = loginRepository.findById(user_index);
    //user.ifPresent(value -> value.setPermissionYn(true));
        /*try {
            String u_i=Integer.toString(user_index);
            int premission = loginRepository.updatePermissionYnById(user_index);
            // int date = loginRepository.updatePermissionDateById(user_index, permission_date);
            // int index = loginRepository.updateAdminIndexById(user_index,5);
            logger.info("premission {}", premission);

            return 1;
        } catch (Exception e) {
            logger.error("Error updating permission for user " + user_index + ": " + e.getMessage());
            return 0;
        }*/
    @Transactional
    public int permissionUpdateUser(int user_index) {
        Timestamp permission_date = new Timestamp(System.currentTimeMillis());
        logger.info("permissionUpdateUser {}", user_index);
        try {
            Optional<UserEntity> userOptional = loginRepository.findById(user_index);
            if (userOptional.isPresent()) {
                UserEntity user = userOptional.get();
                user.updatePermissionYn(permission_date);
                loginRepository.save(user);
                logger.info("Permission updated for user {}", user_index);
                return 1;
            } else {
                logger.error("User not found with id {}", user_index);
                return 0;
            }
        } catch (Exception e) {
            logger.error("Error updating permission for user " + user_index + ": " + e.getMessage());
            return 0;
        }
    }


    public List<PermissionList> permissionList() {
        List<UserEntity> userList = loginRepository.findAll();
        List<PermissionList> answer = new ArrayList<>();
        for (UserEntity user : userList) {
            Integer user_index= user.getUser_index();
            String id = user.getId();
            String email = user.getEmail();
            String roleIndex = user.getRole_index();
            Timestamp applyDate = user.getApply_date();
            Boolean permissionYn = user.getPermission_yn();

            String role = "1".equals(roleIndex) ? "host" : "director";
            String status;
            if (permissionYn == null) {
                status = "processing";
            } else if (permissionYn) {
                status = "completed";
            } else {
                status = "rejected";
            }

            PermissionList permissionList = new PermissionList(user_index, id, email, role, applyDate, status);
            answer.add(permissionList);
        }
        return answer;
    }

    public List<MyqList> myqList() {
        List<MyqEntity> myqlist = myqRepository.findAll();
        List<MyqList> answer = new ArrayList<>();
        for (MyqEntity myq : myqlist) {
            //Integer user_index= user.getUser_index();

            Integer myq_index = myq.getMyq_index();
            String question_title = myq.getQuestion_title();
            Integer user_index = myq.getUser_index();
            Timestamp question_date = myq.getQuestion_date();
            Timestamp answer_date = myq.getAnswer_date();

            String status;
            if (answer_date == null) {
                status = "대기";
            } else {
                status = "완료";
            }

            MyqList myqList = new MyqList(myq_index, question_title, user_index, question_date, answer_date, status);
            answer.add(myqList);
        }
        return answer;
    }


    public Integer answering(int myq_index, String answercontext) {
        /*try {
            Timestamp date = new Timestamp(System.currentTimeMillis());
            Optional<MyqEntity> myqOptional = myqRepository.findById(myq_index);
            if (myqOptional.isPresent()) {
                MyqEntity myq = myqOptional.get();
                myq.updateAnswerDate(date, answercontext);
                myqRepository.save(myq);
                logger.info("Answer updated for question {}", myq_index);
                return 1;
            } else {
                logger.error("Answer not found with {}", myq_index);
                return 0;
            }
        } catch (Exception e) {
            logger.error("Error updating  " + myq_index + ": " + e.getMessage());
            return 0;
        }
    }*/
        try {
            Timestamp date = new Timestamp(System.currentTimeMillis());
            Optional<MyqEntity> myqOptional = myqRepository.findById(myq_index);
            if (myqOptional.isPresent()) {
                MyqEntity myq = myqOptional.get();
                myq.updateAnswerDate(date, answercontext);
                myqRepository.save(myq);
                logger.info("Answer updated for question {}", myq_index);
                return 1;
            } else {
                logger.error("Answer not found with {}", myq_index);
                return 0;
            }
        } catch (Exception e) {
            logger.error("Error updating {}: {}", myq_index, e.getMessage());
            return 0;
        }
    }

    /*
    @Transactional
    public List<UnlockList> unlock() {
        List<UserEntity> userList = loginRepository.findAll();

        if (userList == null) {
            return Collections.emptyList();
        }

        List<UnlockList> answer = new ArrayList<>();
        for (UserEntity user : userList) {
            if (user == null) {
                continue;
            }

            String id = user.getId();
            String email = user.getEmail();
            String roleIndex = user.getRole_index();
            Timestamp applyDate = user.getApply_date();
            Boolean account_lock = user.getAccount_lock();

            if (Boolean.TRUE.equals(account_lock)) {
                String temppw = SimplePasswordGenerator.generateRandomString(12);
                user.updateUnlock(temppw);
                loginRepository.save(user);
                UnlockList unlockList = new UnlockList(id, email, applyDate, roleIndex);
                answer.add(unlockList);

                // Send temporary password via email
                SimpleMailMessage message = new SimpleMailMessage();
                message.setTo(email);
                message.setFrom(FROM_ADDRESS);
                message.setSubject("<밀감> 임시 비밀번호입니다");
                message.setText("임시 비밀번호: " + temppw);

                mailSender.send(message);
            }
        }
        return answer;
    }*/

    @Transactional
    public List<UnlockList> unlock() {
        List<UserEntity> userList = loginRepository.findAll();

        if (userList == null) {
            logger.error("User list is null.");
            return Collections.emptyList();
        }

        List<UnlockList> answer = new ArrayList<>();
        for (UserEntity user : userList) {
            if (user == null) {
                logger.warn("User entity is null.");
                continue;
            }

            String id = user.getId();
            String email = user.getEmail();
            String roleIndex = user.getRole_index();
            Timestamp applyDate = user.getApply_date();
            Boolean account_lock = user.getAccount_lock();

            if (Boolean.TRUE.equals(account_lock)) {
                try {
                    String temppw = SimplePasswordGenerator.generateRandomString(12);
                    user.updateUnlock(temppw);
                    loginRepository.save(user);
                    UnlockList unlockList = new UnlockList(id, email, applyDate, roleIndex);
                    answer.add(unlockList);
                    System.out.println("Start emailService.sendTemporaryPassword >>>>>>>>>>>>>>>>>>>>> ");
                    // 이메일 발송
                    emailService.sendTemporaryPassword(email, temppw);
                    System.out.println("Start emailService.sendTemporaryPassword >>>>>>>>>>>>>>>>>>>>> ");
                } catch (Exception e) {
                    logger.error("Error processing user {}: {}", id, e.getMessage());
                }
            }
        }
        return answer;
    }
}





