import React, {useState} from 'react';
import axios from "axios";
import {useForm} from 'react-hook-form';
import {Button, Grid} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import CustomTextField from '../Styles/CustomTextField';
import DialogTitle from '@mui/material/DialogTitle';

function EmailAlert({open, handleClose}) {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [message, setMessage] = useState('');
    const onSubmit = async (data) => {

        console.log(data);

        try {
            const response = await axios.post(`http://localhost:8080/signup/verify`,data);

            if (response.status === 200) {
                setMessage('인증에 성공했습니다.')
            }
            console.log("Code:", data.title);    // 입력된 코드를 콘솔에 출력
            //handleClose();
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
                sx: {
                    background: '#273142',
                    borderRadius: "12px"
                },
            }}
        >
            <DialogTitle>인증코드 입력</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={8}>
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
                            sx={{
                                width: '100%',
                                // 입력 필드 배경색
                                '& .MuiOutlinedInput-root': {
                                    backgroundColor: '#323D4E',
                                    // 필드 셋의 테두리 색
                                    '& fieldset': {
                                        borderColor: '#CFCFCF1D',
                                    },
                                    // 호버 시 테두리 색
                                    '&:hover fieldset': {
                                        borderColor: '#CFCFCF1D',
                                    },
                                    // 포커스 시 테두리 색
                                    '&.Mui-focused fieldset': {
                                        borderColor: '#FFFFFF1D',
                                    },
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <DialogContentText></DialogContentText>
                        <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
                            인증확인
                        </Button>
                    </Grid>
                </Grid>
                {message && <DialogContentText>{message}</DialogContentText>}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>취소</Button>
            </DialogActions>
        </Dialog>
    );
}

export default EmailAlert;
