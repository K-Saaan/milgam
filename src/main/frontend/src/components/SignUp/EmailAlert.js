import React, {useState} from 'react';
import axios from "axios";
import {useForm} from 'react-hook-form';
import {Button, Divider} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CustomTextField from '../Styles/CustomTextField';

// 타이틀 스타일 정의
const cTitleStyle = (theme) => ({
    color: theme.palette.text.primary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    margin: "5px",
    fontSize: "15px"
});

// 내용 정렬
const actionStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

// 버튼 스타일 정의
const btnStyle = {
    width: "40%",
    marginTop: "20px",
}

/**
 * 1. ClassName: EmailAlert
 * 2. FileName : EmailAlert.js
 * 3. Package  : components.EmailAlert
 * 4. Comment  : 이메일 인증번호 인증 창
 * 5. 작성자   : seungwon
 * 6. 작성일    : 2024. 07. 19
 **/
function EmailAlert({open, handleClose, onSuccess}) {
    const theme = useTheme();
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [message, setMessage] = useState('');
    const titleStyle = cTitleStyle(theme);

    /**
     * 1. MethodName: onSubmit
     * 2. ClassName : EmailAlert
     * 3. Comment   : 인증번호 확인
     * 4. 작성자    : byeongmin
     * 5. 작성일    : 2024. 07. 15
     **/
    const onSubmit = async (data) => {

        console.log(data);

        try {
            const response = await axios.post(`/signup/verify`,data);

            if (response.status === 200) {
                alert('인증에 성공하였습니다.');
                handleClose();
                onSuccess();
            }
            console.log("Code:", data.title);    // 입력된 코드를 콘솔에 출력

        } catch (error) {
            console.error('Error verifying code:', error);
            setMessage('인증에 실패하였습니다. 다시 시도해 주세요');
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                sx: {background: theme.palette.background.default, width: "350px",},
            }}
        >
            <DialogTitle style={titleStyle}>인증코드 입력</DialogTitle>
            <Divider style={{background: theme.palette.divider, marginLeft: '40px', marginRight: '40px',}} />
            <DialogContent style={{margin: "20px", marginTop: "10px", marginBottom: "10px",}}>
                <CustomTextField
                    autoFocus
                    required
                    margin="dense"
                    id="code"
                    name="code"
                    label="인증코드"
                    type="text"
                    fullWidth
                    {...register('code', {required: true})}
                    error={!!errors.title}
                    helperText={errors.title ? 'This field is required' : ''}
                    sx={{width: '100%'}}
                />
                {message && <DialogContentText variant='caption' sx={{ textAlign: 'center' }}>{message}</DialogContentText>}
                <DialogActions style={actionStyle}>
                    <Button variant="contained" onClick={handleSubmit(onSubmit)} style={btnStyle}>
                        인증확인
                    </Button>
                    <Button variant="contained" onClick={handleClose}
                        sx={{...btnStyle, backgroundColor: theme.palette.cancel, '&:hover': { backgroundColor: 'inherit' } }}>
                        닫기
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
}

export default EmailAlert;
