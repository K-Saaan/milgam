import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const SignupButton = () => {
    const navigate = useNavigate();

    const onSignupClick = () => {
        navigate('/signup');
    }

    const signupButtonStyle = {
        color: "#B6B6B6",
    };

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
