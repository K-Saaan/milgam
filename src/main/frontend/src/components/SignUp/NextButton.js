import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';

// const nextButtonStyle = styled(Button)({
//     marginTop: "20px",
//     width: "280px",
//     padding: '10px',
//     backgroundColor: "#4880FF",
//     color: "white",
// });

const NextButton = () => {
    const navigate = useNavigate();

    const onNextClick = () => { // 클릭 시 로그인페이지로
        navigate('/login');
    }

    const nextButtonStyle = {   // 버튼 스타일
        marginTop: "20px",
        width: "280px",
        padding: '10px',
        backgroundColor: "#4880FF",
        color: "white",
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
