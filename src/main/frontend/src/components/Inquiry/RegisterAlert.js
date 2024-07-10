// RegisterAlert.js
import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CustomTextField from '../Styles/CustomTextField';
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import axios from 'axios';

// 내용 정렬
const actionStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
}

function RegisterAlert({ open, handleClose }) {
  const theme = useTheme();
  // useForm 훅으로 폼 관리 기능
  const { register, handleSubmit, formState: { errors } } = useForm();

  // 폼이 제출될 때 호출되는 함수 -------------------- 나중에 수정
  const onSubmit = async (data) => {
    try {
      console.log(data)
      await axios.post('/api/inquiries', data); // 실제 API URL로 변경
      console.log('문의가 성공적으로 등록되었습니다.');
      handleClose();
    } catch (error) {
      console.error('문의 등록에 실패했습니다.', error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: { background: theme.palette.background.paper,
            borderRadius: "12px" },
      }}
    >
      <DialogTitle>문의</DialogTitle>
      <Divider style={{background: theme.palette.divider}} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogContentText>제목</DialogContentText>
          <CustomTextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            placeholder="문의 제목"
            type="text"
            fullWidth
            {...register('title', { required: true })}
            error={!!errors.title}
            helperText={errors.title ? 'This field is required' : ''}
          />
          <DialogContentText>내용</DialogContentText>
          <CustomTextField
            required
            margin="dense"
            id="content"
            name="content"
            placeholder="문의 내용"
            type="text"
            fullWidth
            rows={8}
            multiline // 여러줄 입력 가능
            {...register('content', { required: true })}
            error={!!errors.content}
            helperText={errors.content ? 'This field is required' : ''}
          />
        </DialogContent>
        <DialogActions style={actionStyle}>
          <Button variant="contained" onClick={handleClose}>취소</Button>
          <Button variant="contained" type="submit">등록</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default RegisterAlert;
