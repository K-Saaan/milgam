// ApprovalAlert.js
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Typography } from '@mui/material';

const ApprovalAlert = ({ open, handleClose, handleApprovalOrRejection, inquiry }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>회원가입 상세 정보</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {inquiry.name}님의 회원가입을 승인하시겠습니까?
        </DialogContentText>
            <Typography variant="body1"><strong>아이디:</strong> {inquiry.id}</Typography>
            <Typography variant="body1"><strong>이메일:</strong> {inquiry.email}</Typography>
            <Typography variant="body1"><strong>이름:</strong> {inquiry.name}</Typography>
            <Typography variant="body1"><strong>전화번호:</strong> {inquiry.phone}</Typography>
            <Typography variant="body1"><strong>구분:</strong> {inquiry.role_index}</Typography>
            <Typography variant="body1"><strong>시작 날짜:</strong> {inquiry.start_date}</Typography>
            <Typography variant="body1"><strong>종료 날짜:</strong> {inquiry.end_date}</Typography>
            <Typography variant="body1"><strong>조직:</strong> {inquiry.org}</Typography>
            <Typography variant="body1"><strong>조직 전화번호:</strong> {inquiry.org_phone}</Typography>
            <Typography variant="body1"><strong>상태:</strong> {inquiry.permission_yn === '1' ? '승인' : inquiry.permission_yn === '0' ? '거절' : '진행중'}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">취소</Button>
        <Button onClick={() => handleApprovalOrRejection('0')} color="primary">거절</Button>
        <Button onClick={() => handleApprovalOrRejection('1')} color="primary">승인</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApprovalAlert;
