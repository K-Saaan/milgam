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

/**
 * 1. FunctionName: RegisterAlert
 * 2. FileName : RegisterAlert.js
 * 3. Package  : components.RegisterAlert
 * 4. Comment  : 문의 제출 폼
 * 5. 작성자   : mijin
 * 6. 작성일   : 2024. 07. 19
 **/
function RegisterAlert({ open, handleClose, onSubmit }) {
  const theme = useTheme();
  // useForm 훅으로 폼 관리 기능
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  /**
   * 1. MethodName: handleFormSubmit
   * 2. ClassName : handleFormSubmit
   * 3. Comment   : 문의 데이터 제출
   * 4. 작성자    : mijin
   * 5. 작성일    : 2024. 07. 19
   **/
    const handleFormSubmit = async (data) => {
    try {
      console.log(data);
      await axios.post('/myq/addquestion', data);
      console.log('문의가 성공적으로 등록되었습니다.');
      handleClose();
      onSubmit();
      reset(); // 폼 초기화
    } catch (error) {
      console.error('문의 등록에 실패했습니다.', error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: { background: theme.palette.background.paper, borderRadius: "12px" },
      }}
    >
      <DialogTitle>문의</DialogTitle>
      <Divider style={{background: theme.palette.divider}} />
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <DialogContentText>제목</DialogContentText>
          <CustomTextField
            autoFocus
            required
            margin="dense"
            id="question_title"
            name="question_title"
            placeholder="문의 제목"
            type="text"
            fullWidth
            {...register('question_title', { required: true })}
            error={!!errors.question_title}
            helperText={errors.question_title ? 'This field is required' : ''}
          />
          <DialogContentText>내용</DialogContentText>
          <CustomTextField
            required
            margin="dense"
            id="question"
            name="question"
            placeholder="문의 내용"
            type="text"
            fullWidth
            rows={8}
            multiline
            {...register('question', { required: true })}
            error={!!errors.question}
            helperText={errors.question ? 'This field is required' : ''}
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
