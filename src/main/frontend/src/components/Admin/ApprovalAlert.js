// ApprovalAlert.js
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Typography, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// 내용 정렬
const actionStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

// 버튼 스타일 정의
const btnStyle = {
    width: "40%",
    margin: "10px",
    marginTop: "10px",
}

const ApprovalAlert = ({ open, handleClose, handleApprovalOrRejection, inquiry }) => {
  const theme = useTheme();

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>회원가입 상세 정보</DialogTitle>
      <Divider style={{background: theme.palette.divider}} />
      <DialogContent>
        <DialogContentText style={{marginBottom: '15px'}}>
          {inquiry.name}님의 회원가입을 승인하시겠습니까?
        </DialogContentText>
        <div>
            <Typography variant="body1"><strong>아이디:</strong> {inquiry.id}</Typography>
            <Typography variant="body1"><strong>이메일:</strong> {inquiry.email}</Typography>
            <Typography variant="body1"><strong>이름:</strong> {inquiry.name}</Typography>
            <Typography variant="body1"><strong>전화번호:</strong> {inquiry.phone}</Typography>
            <Typography variant="body1"><strong>구분:</strong> {inquiry.role}</Typography>
            <Typography variant="body1"><strong>시작 날짜:</strong> {inquiry.start_date}</Typography>
            <Typography variant="body1"><strong>종료 날짜:</strong> {inquiry.end_date}</Typography>
            <Typography variant="body1"><strong>조직:</strong> {inquiry.org}</Typography>
            <Typography variant="body1"><strong>조직 전화번호:</strong> {inquiry.org_phone}</Typography>
            <Typography variant="body1"><strong>상태:</strong> {inquiry.status === '1' ? '승인' : inquiry.permission_yn === '0' ? '거절' : '진행중'}</Typography>
         </div>
      </DialogContent>
      <DialogActions style={actionStyle}>
        <Button variant="contained" onClick={handleClose}
            sx={{...btnStyle, backgroundColor: theme.palette.cancel, '&:hover': { backgroundColor: 'inherit' } }}
        >취소</Button>
        <Button variant="contained" onClick={() => handleApprovalOrRejection('rejected')}
            sx={{...btnStyle, backgroundColor: theme.palette.warn, '&:hover': { backgroundColor: 'inherit' }}}
        >거절</Button>
        <Button variant="contained" onClick={() => handleApprovalOrRejection('completed')}
            sx={{...btnStyle, backgroundColor: theme.palette.comp, '&:hover': { backgroundColor: 'inherit' }}}
        >승인</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApprovalAlert;
