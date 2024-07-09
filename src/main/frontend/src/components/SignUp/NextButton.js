import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const ButtonStyle = {   // 버튼 스타일
    marginTop: "20px",
    width: "280px",
    padding: '10px',
    backgroundColor: "#4880FF",
    color: "white",
};

const CustomButton = () => {
    return (
        <div>
            <Button
                variant="contained"
                style={ButtonStyle}
            >
                완료
            </Button>
        </div>
    );
};


const NextButton = ({ text }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const onNextClick = () => { // 클릭 시 로그인페이지로
        if (location.pathname === '/signup') {
            navigate('/login');
        } else if (location.pathname === '/profile') {
            const from = location.state?.from || '/dashboard';
            navigate(from);
        }
    }

    return (
        <div>
            <Button
                variant="contained"
                onClick={onNextClick}
                style={ButtonStyle}
            >
                {text}
            </Button>
        </div>
    );
};

export { CustomButton, NextButton };