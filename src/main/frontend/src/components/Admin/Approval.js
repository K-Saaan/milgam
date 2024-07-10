import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, TablePagination } from '@mui/material';
import { styled } from '@mui/system';
import ApprovalAlert from './ApprovalAlert';
import { useTheme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';

// TableContainer 스타일
const CustomTableContainer = styled(TableContainer)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '12px',
}));

// TableHead 스타일
const CustomTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: theme.palette.secondary,
}));

// TableCell 스타일
const CustomTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.text.primary,
  borderBottom: `2px solid ${theme.palette.divider}`,
}));

// 상태 박스 스타일
const StatusBox = styled(Box)(({ status, theme }) => ({
    backgroundColor: status === 'completed' ? theme.palette.comp : status === 'rejected' ? theme.palette.warn : theme.palette.prog,
    color: theme.palette.text.primary,
    padding: '6px 12px',
    borderRadius: '12px',
    textTransform: 'none',
    display: 'inline-block',
    textAlign: 'center',
    width: "100%",
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
}));

const CustomTableRow = styled(TableRow)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

const progressStyle = {
  margin: "20px",
  justifyContent: "center",
  display: 'flex',
};

const ReplyInquiry = () => {
  const theme = useTheme();

  // 상태 관리 변수
  const [data, setData] = useState(null);
  const [openApproval, setOpenApproval] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // 페이지네이션
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    // 데이터를 가져오는 비동기 함수
    const fetchReq = async () => {
      try {
        const response = await axios.get('/admin/permissionlist');
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error('데이터를 가져오는 중 오류가 발생했습니다:', error);
        setError('데이터를 가져오는 중 오류가 발생했습니다. ')
      }  finally {
        setLoading(false);
      }
    };
    fetchReq();
  }, []);

  // 데이터 삭제 함수
  const handleDelete = (id) => {
    setData(data.filter((row) => row.id !== id));
  };

  // 승인 상태 변경 팝업 열기
  const handleOpenApproval = (inquiry) => {
    setSelectedInquiry(inquiry);
    setOpenApproval(true);
  };

  // 승인 상태 변경 팝업 닫기
  const handleCloseApproval = () => {
    setOpenApproval(false);
    setSelectedInquiry(null);
  };

  // 승인, 거절 처리 함수
  const handleApprovalOrRejection = (status) => {
    // 승인일 때 서버에 요청
    if (status === 'completed') {
      axios.get(`/admin/permission?user_index=${selectedInquiry.id}`)
      .then(response => {
        // 성공 시 변경
        setData(data.map((row) =>
          row.id === selectedInquiry.id ? { ...row, permission_yn: status } : row
        ));
        handleCloseApproval();
      })
      .catch(error => {
        console.error('에러가 발생했습니다:', error);
        alert('처리에 실패했습니다. 다시 시도해 주세요.');
      });
    } else if (status === 'rejected') {
      axios.get(`/admin/deny?user_index=${selectedInquiry.id}`)
      .then(response => {
        setData(data.map((row) =>
          row.id === selectedInquiry.id ? { ...row, permission_yn: status } : row
        ));
        handleCloseApproval();
      })
      .catch(error => {
        console.error('에러가 발생했습니다:', error);
        alert('처리에 실패했습니다. 다시 시도해 주세요.');
      });
    } else { handleCloseApproval(); };
  };


  return (
    <>
        <CustomTableContainer component={Paper}>
        <Table>
            <CustomTableHead>
            <TableRow>
                <TableCell sx={{ width: '10%' }}>아이디</TableCell>
                <TableCell sx={{ width: '25%' }}>이메일</TableCell>
                <TableCell sx={{ width: '20%' }}>구분</TableCell>
                <TableCell sx={{ width: '20%' }}>신청 날짜</TableCell>
                <TableCell sx={{ width: '15%' }}>승인 여부</TableCell>
                <TableCell sx={{ width: '10%' }}></TableCell>
            </TableRow>
            </CustomTableHead>
            <TableBody>
            {data && ( data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <CustomTableRow key={row.id} onClick={() => handleOpenApproval(row)}>
                <CustomTableCell>{row.id}</CustomTableCell>
                <CustomTableCell>{row.email}</CustomTableCell>
                <CustomTableCell>{row.role}</CustomTableCell>
                <CustomTableCell>{row.applyDate}</CustomTableCell>
                <CustomTableCell>
                    <StatusBox status={row.status}>{row.status === null ? '대기' : row.status === 'completed' ? '승인' : '거절'}</StatusBox>
                </CustomTableCell>
                <CustomTableCell>
                    <Button sx={{ color: theme.palette.text.primary }}
                      onClick={(e) => { e.stopPropagation(); handleDelete(row.id); }}
                      disabled={row.status === null}
                    >✕</Button>
                </CustomTableCell>
              </CustomTableRow>
            )))}
            </TableBody>
        </Table>
        {data && <TablePagination
            component="div"
            count={data.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />}
        {/* 로딩 중일 때 표시 */}
        {loading &&
            <div style={progressStyle}>
                <CircularProgress sx={{color:theme.palette.primary.main}} />
            </div>
        }
        {!data && (
            <div style={{textAlign:'center', margin:'10px', color:theme.palette.text.secondary}}>{error}목록이 없습니다.</div>
        )}
        </CustomTableContainer>
        {selectedInquiry && <ApprovalAlert open={openApproval} handleClose={handleCloseApproval} handleApprovalOrRejection={handleApprovalOrRejection} inquiry={selectedInquiry} />}
    </>
  );
}

export default ReplyInquiry;
