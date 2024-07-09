package login;


import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import user.UserEntity;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LoginService {
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    private final LoginRepository loginRepository;

    public List<UserEntity> findAllUser(){
        List<UserEntity> userList = loginRepository.findAll();
        return userList;
    }

    @Transactional
    public int deleteUser(int user_index) {
        try {
            loginRepository.deleteById(user_index);
            return 1;
        }catch (Exception e){
            logger.error("error : ", e.getMessage());
            return 0;
        }
    }
}
