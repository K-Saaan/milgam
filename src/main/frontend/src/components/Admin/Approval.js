import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, TablePagination } from '@mui/material';
import { styled } from '@mui/system';
import ApprovalAlert from './ApprovalAlert';
import { useTheme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { CustomTableRow, CustomTableCell, tableHeaderStyle  } from '../Styles/CustomTable'

// TableContainer 스타일
const CustomTableContainer = styled(TableContainer)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: '12px',
}));

// // TableHead 스타일
// const CustomTableHead = styled(TableHead)(({ theme }) => ({
//   backgroundColor: theme.palette.secondary,
// }));

// // TableCell 스타일
// const CustomTableCell = styled(TableCell)(({ theme }) => ({
//   color: theme.palette.text.primary,
//   borderBottom: `2px solid ${theme.palette.divider}`,
// }));

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

// const CustomTableRow = styled(TableRow)(({ theme }) => ({
//     backgroundColor: theme.palette.background.paper,
// }));

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
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
        /* const instance = axios.create({
          withCredentials: true, // 쿠키 포함 설정
        }); */

        //const response = await instance.get('/admin/userlist');
        const response = await axios.get('/admin/userlist');
        //console.log(response.data);
        const sortedData = response.data.sort((a, b) => new Date(b.applyDate) - new Date(a.applyDate));
        setData(sortedData);
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
  const handleDelete = (user_index) => {
    setData(data.filter((row) => row.user_index !== user_index));
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
    const apiEndpoint = status === 'completed' ? `/admin/permission?user_index=${selectedInquiry.user_index}` : `/admin/deny?user_index=${selectedInquiry.user_index}`;
    /*const instance = axios.create({
      withCredentials: true, // 쿠키 포함 설정
    });

    instance.get(apiEndpoint).then(response => {*/
    axios.get(apiEndpoint).then(response => {
      const updatedData = data.map((row) =>
        row.user_index === selectedInquiry.user_index ? { ...row, status: status === 'completed' ? 'completed' : 'rejected' } : row
      );
      setData(updatedData);
      handleCloseApproval();
    })
    .catch(error => {
      console.error('에러가 발생했습니다:', error);
      alert('처리에 실패했습니다. 다시 시도해 주세요.');
    });
  };

  // 날짜 포맷 함수
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-CA', options);
  };

  return (
    <div>
        <CustomTableContainer component={Paper}>
          <Table>
              <TableHead>
                <TableRow>
                    <TableCell sx={[{ width: '10%' }, tableHeaderStyle(theme)]}>아이디</TableCell>
                    <TableCell sx={[{ width: '25%' }, tableHeaderStyle(theme)]}>이메일</TableCell>
                    <TableCell sx={[{ width: '20%' }, tableHeaderStyle(theme)]}>구분</TableCell>
                    <TableCell sx={[{ width: '20%' }, tableHeaderStyle(theme)]}>신청 날짜</TableCell>
                    <TableCell sx={[{ width: '15%' }, tableHeaderStyle(theme)]}>승인 여부</TableCell>
                    <TableCell sx={[{ width: '10%' }, tableHeaderStyle(theme)]}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {data && ( data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <CustomTableRow key={row.user_index} onClick={() => handleOpenApproval(row)}>
                  <CustomTableCell>{row.id}</CustomTableCell>
                  <CustomTableCell>{row.email}</CustomTableCell>
                  <CustomTableCell>{row.role}</CustomTableCell>
                  <CustomTableCell>{formatDate(row.applyDate)}</CustomTableCell>
                  <CustomTableCell>
                      <StatusBox status={row.status}>{row.status === null ? '대기' : row.status === 'completed' ? '승인' : '거절'}</StatusBox>
                  </CustomTableCell>
                  <CustomTableCell>
                      <Button sx={{ color: theme.palette.text.primary }}
                        onClick={(e) => { e.stopPropagation(); handleDelete(row.user_index); }}
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
            rowsPerPageOptions={[5, 10, 15, 20]} // 페이지 네이션 옵션
            sx={{ mt: 'auto' }} // 페이지네이션을 하단에 고정
        />}
        {/* 로딩 중일 때 표시 */}
        {loading &&
            <div style={progressStyle}>
                <CircularProgress sx={{color:theme.palette.primary.main}} />
            </div>
        }
        {!data && !loading && (
            <div style={{textAlign:'center', margin:'10px', color:theme.palette.text.secondary}}>{error}목록이 없습니다.</div>
        )}
        </CustomTableContainer>
        {selectedInquiry && <ApprovalAlert open={openApproval} handleClose={handleCloseApproval} handleApprovalOrRejection={handleApprovalOrRejection} inquiry={selectedInquiry} />}
    </div>
  );
}

export default ReplyInquiry;
