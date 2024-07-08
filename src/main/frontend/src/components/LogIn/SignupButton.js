import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

// 회원가입 버튼
const SignupButton = () => {
    const navigate = useNavigate();
    //클릭 시 이동 처리
    const onSignupClick = () => {
        navigate('/signup');
    }
    // 버튼 스타일
    const signupButtonStyle = {
        color: "#B6B6B6",
    };
    // 정렬, 마진 설정
    const signupDivStyle = {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '370px',
        marginTop: '0px',
        fontSize: '12px',
    };

    return (
        <div style={signupDivStyle}>
            <Button
                variant="text"
                onClick={onSignupClick}
                style={signupButtonStyle}
            >
                회원가입
            </Button>
        </div>
    );
};

export default SignupButton;
