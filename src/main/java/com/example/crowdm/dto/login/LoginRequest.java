package com.example.crowdm.dto.login;

import lombok.Getter;
import lombok.Setter;


/**
 * 1. ClassName : LoginRequest
 * 2. Comment   : 로그인 시도에 필요한 데이터 정의
 * 3. 작성자    : san
 * 4. 작성일    : 2024. 07.09
 **/

@Getter
@Setter
public class LoginRequest {
    private String id;
    private String pw;
}
