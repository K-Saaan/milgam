import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Grid } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CustomTextField from '../Styles/CustomTextField';

function EmailAlert({ open, handleClose }) {
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
      <DialogTitle>인증코드 입력</DialogTitle>
      <DialogContent>
      <Grid container spacing={2} alignItems="center">
      <Grid item xs={8}>
        <CustomTextField
          autoFocus
          required
          margin="dense"
          id="title"
          name="title"
          label="인증코드"
          type="text"
          fullWidth
          {...register('title', { required: true })}
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
        <Button variant="contained" color="primary">
            인증확인
        </Button>
        </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>취소</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EmailAlert;
