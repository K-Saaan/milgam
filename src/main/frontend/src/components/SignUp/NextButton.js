import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/system';
import { useTheme } from '@mui/material/styles';

// const nextButtonStyle = styled(Button)({
//     marginTop: "20px",
//     width: "280px",
//     padding: '10px',
//     backgroundColor: "#4880FF",
//     color: "white",
// });

const NextButton = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();

    const onNextClick = () => { // 클릭 시 로그인페이지로
        if (location.pathname === '/signup') {
            navigate('/login');
        } else if (location.pathname === '/profile') {
            navigate('/dashboard');
        }
    }

    const nextButtonStyle = {   // 버튼 스타일
        marginTop: "20px",
        width: "280px",
        padding: '10px',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.text.primary,
    };

    return (
        <div>
            <Button
                variant="contained"
                onClick={onNextClick}
                style={nextButtonStyle}
            >
                완료
            </Button>
        </div>
    );
};

export default NextButton;
