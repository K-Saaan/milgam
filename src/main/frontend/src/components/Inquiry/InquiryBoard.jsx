import React, { useState } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RegisterAlert from './RegisterAlert';
import ReplyAlert from './ReplyAlert';

// 문의 데이터 예시
const inquiries = [
  { id: 1, category: '[카테고리] 제목', title: 'Makeup', status: '대기', inquiryDate: '2024-06-26', replyDate: '' },
  { id: 2, category: '', title: 'Asus Laptop', status: '완료', inquiryDate: '2024-06-20', replyDate: '2024-06-25' },
  { id: 3, category: '', title: 'Iphone X', status: '완료', inquiryDate: '2024-06-15', replyDate: '2024-06-25' },
];

// 컨테이너 스타일
const containerStyle = {
  width: '100%',
  padding: 3,
};

// 제목 스타일
const titleStyle = {
  mb: 4,
  color: 'white',
};

// Paper 스타일 (둥근 네모)
const paperStyle = {
  padding: 3,
  borderRadius: 2,
  backgroundColor: '#273142',
  color: 'white',
};

// 헤더 스타일
const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 2,
};

// 테이블 헤더 스타일
const tableHeaderStyle = {
  color: 'white',
};

// 테이블 셀 스타일
const tableCellStyle = {
  color: 'white',
};

const InquiryBoard = () => {
  // 등록 다이얼로그 열림 상태 관리
  const [openRegister, setOpenRegister] = useState(false);
  // 답변 다이얼로그 열림 상태 관리
  const [openReply, setOpenReply] = useState(false);
  // 선택된 문의 관리
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

  return (
    <Box sx={containerStyle}>
      {/* 제목 */}
      <Typography variant="h4" sx={titleStyle}>
        문의하기
      </Typography>
      {/* 내용 */}
      <Paper sx={paperStyle}>
        <Box sx={headerStyle}>
          <Typography variant="h6">내 문의목록</Typography>
          {/* 새 문의 버튼 */}
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleClickOpenRegister}>
            새 문의
          </Button>
        </Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={tableHeaderStyle}>번호</TableCell>
                <TableCell sx={tableHeaderStyle}>제목</TableCell>
                <TableCell sx={tableHeaderStyle}>상태</TableCell>
                <TableCell sx={tableHeaderStyle}>문의 날짜</TableCell>
                <TableCell sx={tableHeaderStyle}>답변 날짜</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inquiries.map((inquiry) => (
                // 각 문의 항목을 클릭하면 답변 다이얼로그 열기
                <TableRow key={inquiry.id} onClick={() => handleClickOpenReply(inquiry)} sx={{ cursor: 'pointer' }}>
                  <TableCell sx={tableCellStyle}>{inquiry.id}</TableCell>
                  <TableCell sx={tableCellStyle}>{inquiry.title}</TableCell>
                  <TableCell sx={tableCellStyle}>{inquiry.status}</TableCell>
                  <TableCell sx={tableCellStyle}>{inquiry.inquiryDate}</TableCell>
                  <TableCell sx={tableCellStyle}>{inquiry.replyDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      {/* 등록 다이얼로그 */}
      <RegisterAlert open={openRegister} handleClose={handleCloseRegister} />
      {/* 답변 다이얼로그 */}
      {selectedInquiry && <ReplyAlert open={openReply} handleClose={handleCloseReply} inquiry={selectedInquiry} />}
    </Box>
  );
};

export default InquiryBoard;
