package com.example.crowdm.service.admin;

import com.example.crowdm.dto.user.PermissionList;
import com.example.crowdm.entity.admin.MyqEntity;
import com.example.crowdm.entity.faq.FaqEntity;
import com.example.crowdm.entity.user.UserEntity;
import com.example.crowdm.repository.admin.MyqRepository;
import com.example.crowdm.repository.login.LoginRepository;
import com.example.crowdm.entity.admin.AdminEntity;
import com.example.crowdm.repository.admin.AdminRepository;

import java.util.ArrayList;
import java.util.List;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.crowdm.entity.admin.AdminEntity;
import com.example.crowdm.repository.admin.AdminRepository;
import org.springframework.transaction.annotation.Transactional;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.Optional;

import common.util.DateUtil;

@Service
@RequiredArgsConstructor
public class AdminService {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    private final LoginRepository loginRepository;
    private final MyqRepository myqRepository;
    public List<UserEntity> showAllUser(){
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

    @Autowired
    public List<PermissionList> permissionList() {
        List<UserEntity> userList = loginRepository.findAll();
        List<PermissionList> answer = new ArrayList<>();
        for (UserEntity user : userList) {
            //Integer user_index= user.getUser_index();
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

            PermissionList permissionList = new PermissionList(id, email, role, applyDate, status);
            answer.add(permissionList);
        }
        return answer;
    }

    public List<MyqEntity> myqList() {
        List<MyqEntity> myqlist=myqRepository.findAll();
        return myqlist;
    }


}
