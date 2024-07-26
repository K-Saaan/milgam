import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

/**
 * 1. ClassName: SignupButton
 * 2. FileName : SignupButton.js
 * 3. Package  : components.Login
 * 4. Comment  : 회원가입 창으로 이동하는 버튼
 * 5. 작성자   : boreum
 * 6. 작성일   : 2024. 06. 27
 **/
// 회원가입 버튼
const SignupButton = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    //클릭 시 이동 처리
    const onSignupClick = () => {
        navigate('/signup');
    }
    // 버튼 스타일
    const signupButtonStyle = {
        color:  theme.palette.text.secondary,
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
