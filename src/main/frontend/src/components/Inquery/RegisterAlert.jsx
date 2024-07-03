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
        sx: { background: '#273142',
            borderRadius: "12px" },
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
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#323D4E',
              '& fieldset': {
                borderColor: '#CFCFCF1D',
              },
              '&:hover fieldset': {
                borderColor: '#CFCFCF1D',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#FFFFFF1D',
              },
            },
          }}
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
          multiline // 초기 표시 줄 수
          {...register('content', { required: true })}
          error={!!errors.content}
          helperText={errors.content ? 'This field is required' : ''}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#323D4E',
              '& fieldset': {
                borderColor: '#CFCFCF1D',
              },
              '&:hover fieldset': {
                borderColor: '#CFCFCF1D',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#FFFFFF1D',
              },
            },
          }}
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
