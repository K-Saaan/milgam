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
    '& .MuiInputBase-input::placeholder': {
        color: '#B6B6B6',
        opacity: 1,
        fontSize: '10px',
    },
    '& .MuiInputBase-input': {
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

const Login = () => {
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

    // 화면 이동을 위한 네비게이터
    let navigate = useNavigate();
    // 로그인 버튼 클릭 시 동작
	const onLogin = async (e) => {
        e.preventDefault();

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
            }
        } catch (error) {
            console.log(error);
        }*/
    };

    return (
        <Stack
            component="form"
            sx={{
                width: '25ch',
                padding: '20px',
                background: '#273142',
            }}
            spacing={3}
            noValidate
            autoComplete="off"
        >
            <div style={{color:"white",}}>아이디</div>
            <CustomTextField
                id="userId"
                value={loginInput.userId}
                onChange={handleInputChange}
                size="small"
                placeholder="아이디를 입력하세요."
            />
            <div style={{color:"white",}}>비밀번호</div>
            <CustomTextField
                id="password"
                value={loginInput.password}
                onChange={handleInputChange}
                size="small"
                placeholder="비밀번호를 입력하세요."
            />
            <Link
                to="/signup"
                style={{
                    textDecoration: "none",
                    color: "gray"
            }}>
                회원가입
            </Link>
            <Button
                variant="contained"
                onClick={onLogin}
            >
                로그인
            </Button>
        </Stack>
    );
}

export default Login;