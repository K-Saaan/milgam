import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';


const CustomTextField = styled(TextField)(({ theme }) => ({
    width: '370px',
    '& .MuiInputBase-input': {
        color: 'white',
    },
    '& .MuiInputLabel-root': {
        color: '#B6B6B6',
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: 'white',
    },
    '& .MuiOutlinedInput-root': {
        backgroundColor: '#323D4E',
        opacity: 1,
        height: '52px',
        '& fieldset': {
            borderColor: '#CFCFCF1D',
            borderWidth: '0.2px',
        },
        '&:hover fieldset': {
            borderColor: '#CFCFCF1D',
            borderWidth: '0.2px',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#FFFFFF1D',
            borderWidth: '2px',
        },
    },
}));

export default CustomTextField;