import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Skeleton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import React, { useEffect, useState } from 'react';
import { CustomTableRow, tableCellStyle, tableHeaderStyle } from '../Styles/CustomTable';
import RegisterAlert from './RegisterAlert';
import ReplyAlert from './ReplyAlert';

axiosRetry(axios, { retries: 5, retryDelay: axiosRetry.exponentialDelay });

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

/**
 * 1. FunctionName: InquiryBoard
 * 2. FileName : InquiryBoard.js
 * 3. Package  : components.InquiryBoard
 * 4. Comment  : 문의 보여주는 카드
 * 5. 작성자   : mijin
 * 6. 작성일   : 2024. 07. 12
 **/
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

  const [openRegister, setOpenRegister] = useState(false);  
  const [openReply, setOpenReply] = useState(false);   
  const [selectedInquiry, setSelectedInquiry] = useState(null);   

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

  /**
   * 1. MethodName: fetchInquiries
   * 2. ClassName : fetchInquiries
   * 3. Comment   : 문의 데이터 통신
   * 4. 작성자    : mijin
   * 5. 작성일    : 2024. 07. 19
   **/
  const fetchInquiries = async () => {
    try {
      const response = await axios.get('/myq/questionlist');
      console.log('Inquiry 데이터:', response.data);
      const sortedData = response.data.sort((a, b) => new Date(b.question_date) - new Date(a.question_date));
      setInquiries(sortedData);
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
          rowsPerPageOptions={[5, 10, 15, 20]} 
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