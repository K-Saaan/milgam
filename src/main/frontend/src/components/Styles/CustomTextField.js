import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';

// 텍스트필드 스타일 지정
const CustomTextField = styled(TextField)(({ theme }) => ({
    width: '370px',
    //입력 커서 색
    '& .MuiInputBase-input': {
        color: theme.palette.text.secondary,
    },
    //입력 글씨
    '& .MuiInputLabel-root': {
        color: theme.palette.text.secondary,
    },
    //입력할 때 올라가는 라벨 색
    '& .MuiInputLabel-root.Mui-focused': {
        color: theme.palette.text.primary,
    },
    //입력 칸
    '& .MuiOutlinedInput-root': {
        backgroundColor: theme.palette.secondary.main,
        opacity: 1,
        //기본
        '& fieldset': {
            borderColor: '#CFCFCF1D',
            borderWidth: '0.2px',
        },
        //커서 올릴 때(변화 없는 거 맞음)
        '&:hover fieldset': {
            borderColor: '#CFCFCF1D',
            borderWidth: '0.2px',
        },
        //클릭
        '&.Mui-focused fieldset': {
            borderColor: '#FFFFFF1D',
            borderWidth: '2px',
        },
    },
}));

export default CustomTextField;