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

function RegisterAlert({ open, handleClose }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Title:", data.title);
    console.log("Content:", data.content);
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: { borderRadius: "12px" },
      }}
    >
      <DialogTitle>문의</DialogTitle>
      <DialogContent>
        <DialogContentText>제목</DialogContentText>
        <CustomTextField
          autoFocus
          required
          margin="dense"
          id="title"
          name="title"
          label="문의 제목"
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
          label="문의 내용"
          type="text"
          fullWidth
          multiline  // 여러 줄 입력을 가능하게 하는 속성
          rows={4}  // 초기 표시 줄 수
          {...register('content', { required: true })}
          error={!!errors.content}
          helperText={errors.content ? 'This field is required' : ''}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
        <Button type="submit" onClick={handleSubmit(onSubmit)}>등록</Button>
      </DialogActions>
    </Dialog>
  );
}

export default RegisterAlert;
