import React, { useState, useEffect } from 'react';
import { styled, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, TablePagination , Skeleton} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RegisterAlert from './RegisterAlert';
import ReplyAlert from './ReplyAlert';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { CustomTableRow, tableHeaderStyle, tableCellStyle } from '../Styles/CustomTable'

// 컨테이너 스타일
const containerStyle = {
  width: '100%',
  //padding: 3,
  overflowX: 'auto',
  display: 'flex',
  flexDirection: 'column',
  height: '100%', // 페이지네이션 버튼을 테이블 하단에 고정하기 위한 설정
};

// 헤더 스타일
const headerStyle = (theme) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: 4,
  mb: 5,
});


// 날짜 형식을 yyyy-mm-dd로 변환하는 함수
const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const InquiryBoard = () => {
  const theme = useTheme();
  const [page, setPage] = React.useState(0); // 페이지네이션
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [inquiries, setInquiries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [openRegister, setOpenRegister] = useState(false);   // 등록 다이얼로그 열림 상태 관리
  const [openReply, setOpenReply] = useState(false);   // 답변 다이얼로그 열림 상태 관리
  const [selectedInquiry, setSelectedInquiry] = useState(null);   // 선택된 문의 관리

  // 등록 다이얼로그 열기
  const handleClickOpenRegister = () => {
    setOpenRegister(true);
  };

  // 등록 다이얼로그 닫기
  const handleCloseRegister = () => {
    setOpenRegister(false);
  };

  // 답변 다이얼로그 열기
  const handleClickOpenReply = (inquiry) => {
    setSelectedInquiry(inquiry);
    setOpenReply(true);
  };

  // 답변 다이얼로그 닫기
  const handleCloseReply = () => {
    setOpenReply(false);
    setSelectedInquiry(null);
  };

  const fetchInquiries = async () => {
    try {
      const response = await axios.get('/myq/questionlist');
      console.log('Inquiry 데이터:', response.data);
      setInquiries(response.data);
    } catch (error) {
      console.error('Inquiry 데이터를 가져오는 중 오류 발생:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  return (
    <Box sx={containerStyle}>
      <Box sx={headerStyle(theme)}>
        <Typography variant="h5"></Typography>
        {/* 새 문의 버튼 */}
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleClickOpenRegister}>
          새 문의
        </Button>
      </Box>
      <TableContainer sx={{ borderRadius: '15px 15px 0px 0px', flexGrow: 1, overflowY: 'auto'}}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={tableHeaderStyle(theme)}>번호</TableCell>
              <TableCell sx={tableHeaderStyle(theme)}>제목</TableCell>
              <TableCell sx={tableHeaderStyle(theme)}>상태</TableCell>
              <TableCell sx={tableHeaderStyle(theme)}>문의 날짜</TableCell>
              <TableCell sx={tableHeaderStyle(theme)}>답변 날짜</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              // 로딩중 스켈레톤 적용
              <TableRow>
                <TableCell colSpan={5}>
                  <Skeleton variant="text" width="100%" height={50} />
                  <Skeleton variant="text" width="100%" height={50} />
                  <Skeleton variant="text" width="100%" height={50} />
                </TableCell>
              </TableRow>
            ) : (
              inquiries &&
              inquiries.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((inquiry, index) => (
                // 각 문의 항목을 클릭하면 답변 다이얼로그 열기
                <CustomTableRow key={inquiry.myq_index} onClick={() => handleClickOpenReply(inquiry)} sx={{ cursor: 'pointer' }}>
                  {/* <TableCell sx={tableCellStyle(theme)}>{inquiry.myq_index}</TableCell> */}
                  <TableCell sx={tableCellStyle(theme)}>{page * rowsPerPage + index + 1}</TableCell>
                  <TableCell sx={tableCellStyle(theme)}>{inquiry.question_title}</TableCell>
                  <TableCell sx={tableCellStyle(theme)}>{inquiry.status}</TableCell>
                  <TableCell sx={tableCellStyle(theme)}>{formatDate(inquiry.question_date)}</TableCell>
                  <TableCell sx={tableCellStyle(theme)}>{formatDate(inquiry.answer_date)}</TableCell>
                </CustomTableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {inquiries && (
        <TablePagination
          component="div"
          count={inquiries.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 15, 20]} // 페이지 네이션 옵션
          sx={{ mt: 'auto' }} // 페이지네이션을 하단에 고정
        />
      )}
      {/* 등록 다이얼로그 */}
      <RegisterAlert open={openRegister} handleClose={handleCloseRegister} onSubmit={fetchInquiries}/>
      {/* 답변 다이얼로그 */}
      {selectedInquiry && (
        <ReplyAlert open={openReply} handleClose={handleCloseReply} inquiry={selectedInquiry} />
      )}
    </Box>
  );
};

export default InquiryBoard;