// ApprovalAlert.js
import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    Button, Divider, Table, TableBody, TableCell, TableContainer,
    TableRow, Paper, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import axios from 'axios';

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

// TableCell 스타일
const CustomTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.primary,
  borderBottom: `2px solid ${theme.palette.divider}`,
}));

const ApprovalAlert = ({ open, handleClose, handleApprovalOrRejection, inquiry }) => {
  const theme = useTheme();

  // 임시 데이터 설정
  const initialData = {
    user_index: 1, id: 'id01', email: 'Christine@email.com',
    name: 'christine', phone: '012-3456-7890', role: '관공서',
    start_date: '2023-12-01', end_date: '2024-01-26',
    org: '여의도 구청', org_phone: '02-3456-7890', status: 'completed'
  };

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (inquiry && inquiry.user_index) {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await axios.get(`/admin/userdetail?user_index=${inquiry.user_index}`);
          setData(response.data);
        } catch (err) {
          setError('데이터를 불러오는 데 실패했습니다.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [inquiry]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>회원가입 상세 정보</DialogTitle>
      <Divider style={{background: theme.palette.divider}} />
      <DialogContent>
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <CircularProgress />
          </div>
        )}
        {error && (
          <DialogContentText style={{ color: theme.palette.text.secondary }}>
            {error}
          </DialogContentText>
        )}
        {data && (<>
          <DialogContentText style={{marginBottom: '15px'}}>
            {data.name}님의 회원가입을 승인하시겠습니까?
          </DialogContentText>
          <TableContainer component={Paper}>
            <Table>
                <TableBody>
                    <TableRow>
                        <CustomTableCell><strong>아이디</strong></CustomTableCell>
                        <CustomTableCell>{data.id}</CustomTableCell>
                        <CustomTableCell/>
                        <CustomTableCell><strong>이메일</strong></CustomTableCell>
                        <CustomTableCell>{data.email}</CustomTableCell>
                    </TableRow>
                    <TableRow>
                        <CustomTableCell><strong>이름</strong></CustomTableCell>
                        <CustomTableCell>{data.name}</CustomTableCell>
                        <CustomTableCell/>
                        <CustomTableCell><strong>전화번호</strong></CustomTableCell>
                        <CustomTableCell>{data.phone}</CustomTableCell>
                    </TableRow>
                    <TableRow>
                        <CustomTableCell><strong>구분</strong></CustomTableCell>
                        <CustomTableCell>{data.role}</CustomTableCell>
                        <CustomTableCell/><CustomTableCell/><CustomTableCell/>
                    </TableRow>
                    <TableRow>
                        <CustomTableCell><strong>시작 날짜</strong></CustomTableCell>
                        <CustomTableCell>{data.start_date}</CustomTableCell>
                        <CustomTableCell/>
                        <CustomTableCell><strong>종료 날짜</strong></CustomTableCell>
                        <CustomTableCell>{data.end_date}</CustomTableCell>
                    </TableRow>
                    <TableRow>
                        <CustomTableCell><strong>조직</strong></CustomTableCell>
                        <CustomTableCell>{data.org}</CustomTableCell>
                        <CustomTableCell/>
                        <CustomTableCell><strong>조직 전화번호</strong></CustomTableCell>
                        <CustomTableCell>{data.org_phone}</CustomTableCell>
                    </TableRow>
                    <TableRow>
                        <CustomTableCell><strong>상태</strong></CustomTableCell>
                        <CustomTableCell>
                            {data.status === 'completed' ? '승인' : data.status === 'rejected' ? '거절' : '진행중'}
                        </CustomTableCell>
                        <CustomTableCell/><CustomTableCell/><CustomTableCell/>
                    </TableRow>
                </TableBody>
            </Table>
          </TableContainer>
        </>)}
      </DialogContent>
      <DialogActions style={actionStyle}>
        <Button variant="contained" onClick={handleClose}
            sx={{...btnStyle, backgroundColor: theme.palette.cancel, '&:hover': { backgroundColor: 'inherit' } }}
        >취소</Button>
        {data && !(data.status === 'rejected') && (<Button variant="contained" onClick={() => handleApprovalOrRejection('rejected')}
            sx={{...btnStyle, backgroundColor: theme.palette.warn, '&:hover': { backgroundColor: 'inherit' }}}
        >거절</Button> )}
        {data && !(data.status === 'completed') && (<Button variant="contained" onClick={() => handleApprovalOrRejection('completed')}
            sx={{...btnStyle, backgroundColor: theme.palette.comp, '&:hover': { backgroundColor: 'inherit' }}}
        >승인</Button>)}
      </DialogActions>
    </Dialog>
  );
};

export default ApprovalAlert;
