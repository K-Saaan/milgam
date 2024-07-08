import Button from '@mui/material/Button';
import { styled } from '@mui/system';

// 버튼 스타일 지정
const LongButton = styled(Button)(({ theme }) =>({
    marginTop: "20px",
    width: "280px",
    padding: '10px',
    backgroundColor: theme.primary,
    color: theme.text,
}));

export default LongButton;
