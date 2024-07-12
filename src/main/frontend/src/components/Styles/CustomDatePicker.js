import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { styled } from '@mui/system';

// datepicker 스타일 지정
const CustomDatePicker = styled(DatePicker)(({ theme }) => ({
    width: '370px',
    height: '56px',
    marginBottom: '23px', // DatePicker 입력칸 사이의 간격 추가
    borderRadius: '8px', // 모서리 둥글게 추가
    //입력 글씨
    '& .MuiInputLabel-root': {
        color: theme.palette.text.secondary,
    },
    //입력할 때 올라가는 라벨 색
    '& .MuiInputLabel-root.Mui-focused': {
        color: theme.palette.text.primary,
    },
    '& .MuiOutlinedInput-root': {
        backgroundColor: theme.palette.secondary.main,
        opacity: 1,
        '& fieldset': {
            borderColor: theme.palette.border.primary,
            borderWidth: '0.2px',
        },
        '&:hover fieldset': {
            borderColor: theme.palette.border.primary,
            borderWidth: '0.2px',
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.border.secondary,
            borderWidth: '2px',
        },
    },
}));

export default CustomDatePicker;
