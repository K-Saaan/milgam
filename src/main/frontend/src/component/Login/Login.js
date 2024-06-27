import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Main from "../Main/Main.js";
import Signup from "../Signup/Signup.js";

import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';

//스타일 변경
const CustomTextField = styled(TextField)(({ theme }) => ({
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
        '& fieldset': {
            borderColor: '#CFCFCF',
            borderWidth: '0.6px',
        },
        '&:hover fieldset': {
            borderColor: '#CFCFCF',
            borderWidth: '0.6px',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#ffffff',
            borderWidth: '1.5px',
        },
    },
}));

const Login = ({ marginBottom }) => {
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

    //에러 메시지
    const [userIdError, setUserIdError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const idStyles = {
        marginBottom: userIdError ? '0px' : '24px'
    };
    const pwStyles = {
        marginBottom: passwordError ? '0px' : '24px'
    };

    // 화면 이동을 위한 네비게이터
    let navigate = useNavigate();
    // 로그인 버튼 클릭 시 동작
	const onLogin = async (e) => {
        e.preventDefault();

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
            // 현재는 동작 확인을 위해 바로 리다이렉트
            navigate('/');

    /*        try {
                const res = await axiosInstance.post(`/com/login`, {
                    userId: loginInput.userId,
                    password: loginInput.password,
                });
                //이 안에 로그인 성공 로직
                if (res.status === 200) {
                    console.log(res.data);
                    navigate('/');
                }
            } catch (error) {
                console.log(error);
                isValid = false;
                setPasswordError("아이디 혹은 비밀번호를 확인해주세요.");
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
                background: '#273142',
                minHeight: '100vh',
                margin: 'auto',
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
                <Link
                    to="/signup"
                    style={{
                        textDecoration: "none",
                        color: "gray"
                }}>
                    회원가입
                </Link>
            </div>
            <Button
                variant="contained"
                onClick={onLogin}
                style={{
                    marginTop: "40px",
                    minWidth: "150px",
                }}
            >
                로그인
            </Button>
        </Stack>
    );
}

export default Login;