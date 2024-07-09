package com.example.crowdm.service.admin;

import com.example.crowdm.dto.faq.MailDto;
import com.example.crowdm.dto.faq.MyqList;
import com.example.crowdm.dto.user.UserDetail;
import com.example.crowdm.repository.User.UserRepository;
import com.example.crowdm.service.mail.MailSender;
import com.example.crowdm.dto.faq.UnlockList;
import com.example.crowdm.dto.user.PermissionList;
import com.example.crowdm.entity.admin.MyqEntity;

import com.example.crowdm.entity.user.UserEntity;
import com.example.crowdm.repository.admin.MyqRepository;
import com.example.crowdm.repository.login.LoginRepository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.example.crowdm.service.mail.MailSender;
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
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    //private static final Logger logger2 = Logger.getLogger(AdminService.class.getName());
    private final LoginRepository loginRepository;
    private final UserRepository userRepository;
    private final MyqRepository myqRepository;
    private final MailSender mailSender;
    public List<UserEntity> showAllUser() {
        List<UserEntity> userList = loginRepository.findAll();
        return userList;
    }



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
    public int denyUpdateUser(int user_index) {

        try {
            Optional<UserEntity> userOptional = loginRepository.findById(user_index);
            if (userOptional.isPresent()) {
                UserEntity user = userOptional.get();
                user.updateDenyYn();
                loginRepository.save(user);
                logger.info("Permission denied for user {}", user_index);
                return 1;
            } else {
                logger.error("User not found with id {}", user_index);
                return 0;
            }
        } catch (Exception e) {
            logger.error("Error updating deny for user " + user_index + ": " + e.getMessage());
            return 0;
        }

    }
/*
    public List<UserDetail> userdetail(int user_index) {
        UserEntity user = userRepository.findByUserIndex(user_index);
        if (user == null) {
            // Handle case where user is not found, for example, return an empty list or throw an exception
            return List.of();
        }

        // Determine role based on role_index
        String role;
        if (user.getRole_index() == "1") {
            role = "director";
        } else {
            role = "host";
        }

        // Determine status based on permissionyn
        String status;
        if (user.getPermissionyn() == false) {
            status = "거절"; // Waiting
        } else if (user.getPermissionyn()==true) {
            status = "승인"; // Approved
        } else {
            status = "대기"; // Rejected
        }

        UserDetail userDetail = new UserDetail();
        userDetail.setUser_index(user.getUser_index());
        userDetail.setId(user.getId());
        userDetail.setEmail(user.getEmail());
        userDetail.setName(user.getName());
        userDetail.setPhone(user.getPhone());
        userDetail.setRole(role);
        userDetail.setStart_date(user.getStart_date());
        userDetail.setEnd_date(user.getEnd_date());
        userDetail.setOrg(user.getOrg());
        userDetail.setOrg_phone(user.getOrg_phone());
        userDetail.setStatus(status);

        return List.of(userDetail);
    }*/


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
            String status;
            if (roleIndex == "2") {
                status = "host";
            } else {
                status = "director";
            }
            if (Boolean.TRUE.equals(account_lock)) {
                try {
                    String temppw = SimplePasswordGenerator.generateRandomString(12);
                    user.updateUnlock(temppw);
                    loginRepository.save(user);
                    UnlockList unlockList = new UnlockList(id, email, applyDate, status);
                    answer.add(unlockList);
                    System.out.println("Start emailService.sendTemporaryPassword >>>>>>>>>>>>>>>>>>>>> ");
                    // 이메일 발송
                    mailSender.sendMailTemppw(email, "temppw", temppw);
                    System.out.println("Start emailService.sendTemporaryPassword >>>>>>>>>>>>>>>>>>>>> ");
                } catch (Exception e) {
                    logger.error("Error processing user {}: {}", id, e.getMessage());
                }
            }
        }
        return answer;
    }
}





