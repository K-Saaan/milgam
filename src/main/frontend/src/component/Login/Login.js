import React, { useState } from "react";
import LoginAlert from "./LoginAlert.js"

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

/*
  * 1. FileName : Background
  * 2. Comment   : 로그인 화면 컴포넌트
  * 3. 작성자    : boreum
  * 4. 작성일    : 2024. 06. 26
*/

/*
  * 1. FunctionName: CustomTextField
  * 2. Comment   : TextField 스타일 변경
  * 3. 작성자    : boreum
  * 4. 작성일    : 2024. 06. 27
*/
const CustomTextField = styled(TextField)(({ theme }) => ({
    width: '370px',
    '& .MuiInputBase-input': {
        color: 'white',
      },
    '& .MuiInputLabel-root': {
        color: '#B6B6B6',
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: 'white',
    },
    '& .MuiOutlinedInput-root': {
        backgroundColor: '#323D4E',
        opacity: 1,
        height: '52px',
        '& fieldset': {
            borderColor: '#CFCFCF1D',
            borderWidth: '0.2px',
        },
        '&:hover fieldset': {
            borderColor: '#CFCFCF1D',
            borderWidth: '0.2px',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#FFFFFF1D',
            borderWidth: '2px',
        },
    },
}));

/*
  * 1. FunctionName: Login
  * 2. Comment   : 로그인 화면 출력, 로그인 입력 처리
  * 3. 작성자    : boreum
  * 4. 작성일    : 2024. 06. 27
*/
const Login = ({ marginBottom, onSignupClick }) => {
    // 입력 받을 아이디, 비밀번호
    const [loginInput, setLoginInput] = useState({
        userId: "",
        password: "",
    });

    // 입력이 들어올 때 아이디, 비밀번호 값 업데이트
    const handleInputChange = (e) => {
        setLoginInput((prev) => ({
            ...prev,
            [e.target.id]: e.target.value
         }));
    };

    // 엔터키로 로그인 동작
    const activeEnter = (e) => {
        if(e.key === "Enter") {
            onLogin(e);
        }
    }

    //에러 메시지
    const [userIdError, setUserIdError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    //에러 메시지에 따른 스타일 변경
    const idStyles = {
        marginBottom: userIdError ? '0px' : '24px'
    };
    const pwStyles = {
        marginBottom: passwordError ? '0px' : '24px'
    };

    //대시보드로 이동할 함수 필요: Main.js
    const onDashboard = (e) => {
        onSignupClick();
    }

    // 로그인 계정 잠금 팝업
    const [alertOpen, setOpen] = useState(false);

     const handleClickOpen = () => {
        setOpen(true);
     };

     const handleClose = () => {
        setOpen(false);
     };

    // 로그인 동작
	const onLogin = async (e) => {
        e.preventDefault();

        // 입력 확인
        let isValid = true;

        if (loginInput.userId.trim() === "") {
            setUserIdError("아이디를 입력해주세요.");
            isValid = false;
        } else {
            setUserIdError("");
        }

        if (loginInput.password.trim() === "") {
            setPasswordError("비밀번호를 입력해주세요.");
            isValid = false;
        } else {
            setPasswordError("");
        }

        if(isValid) {
            // 동작 확인
            //onSignupClick();
            handleClickOpen();

            //유효 확인
    /*        try {
                const res = await axiosInstance.post(`/com/login`, {
                    userId: loginInput.userId,
                    password: loginInput.password,
                });
                // 로그인 성공 로직
                if (res.status === 200) {
                    console.log(res.data);
                    onSignupClick();
                }
            } catch (error) {
                console.log(error);
                //불일치
                isValid = false;
                setPasswordError("아이디 혹은 비밀번호를 확인해주세요.");
                setLoginInput((prev) => ({
                    ...prev,
                    password: ""
                }));
                //잠금
                handleClickOpen();
            }*/
        }
    };

    return (
        <Stack
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '25ch',
                padding: '20px',
                minHeight: '100vh',
                margin: 'auto',
                minWidth: '400px',
            }}
            spacing={3}
            noValidate
            autoComplete="off"
        >
            <CustomTextField
                label="아이디"
                id="userId"
                value={loginInput.userId}
                onChange={handleInputChange}
                inputProps={{ maxLength: 30, }}
                size="small"
                required
                error={!!userIdError}
                helperText={userIdError}
                style={idStyles}
            />
            <CustomTextField
                label="비밀번호"
                id="password"
                type="password"
                value={loginInput.password}
                onChange={handleInputChange}
                onKeyDown={(e) => activeEnter(e)}
                inputProps={{ maxLength: 30, }}
                size="small"
                required
                error={!!passwordError}
                helperText={passwordError}
                style={pwStyles}
            />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    width: '100%',
                    marginTop: '0px',
                    fontSize: '12px',
                }}
            >
                <Button
                    variant="text"
                    onClick={onDashboard}
                    style={{
                        color: "#B6B6B6",
                    }}
                >
                    회원가입
                </Button>
            </div>
            <Button
                variant="contained"
                onClick={onLogin}
                style={{
                    marginTop: "40px",
                    minWidth: "280px",
                    backgroundColor: "#4880FF",
                    padding: '10px',
                }}
            >
                로그인
            </Button>
            <LoginAlert alertOpen={alertOpen} handleClose={handleClose} />
        </Stack>
    );
}

export default Login;