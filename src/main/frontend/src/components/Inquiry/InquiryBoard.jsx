import React, { useState } from 'react';
import { styled, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RegisterAlert from './RegisterAlert';
import ReplyAlert from './ReplyAlert';
import { useTheme } from '@mui/material/styles';

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

// 행 스타일
const CustomTableRow = styled(TableRow)(({ theme }) => ({
    cursor: 'pointer',
    backgroundColor: theme.palette.background.paper,
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
}));

// 헤더 스타일
const headerStyle = (theme) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 4,
});

// 테이블 헤더 스타일
const tableHeaderStyle = (theme) => ({
  color: theme.palette.text.primary,
  borderBottom: `2px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.default
});

// 테이블 셀 스타일
const tableCellStyle = (theme) => ({
  color: theme.palette.text.primary,
  borderBottom: `2px solid ${theme.palette.divider}`,
});

const InquiryBoard = () => {
  const theme = useTheme();

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
      {/* 내용 */}
        <Box sx={headerStyle(theme)}>
          <Typography variant="h6">내 문의목록</Typography>
          {/* 새 문의 버튼 */}
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleClickOpenRegister}>
            새 문의
          </Button>
        </Box>
        <TableContainer sx={{borderRadius: "15px 15px 0px 0px"}}>
          <Table>
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
              {inquiries.map((inquiry) => (
                // 각 문의 항목을 클릭하면 답변 다이얼로그 열기
                <CustomTableRow key={inquiry.id} onClick={() => handleClickOpenReply(inquiry)} sx={{ cursor: 'pointer' }}>
                  <TableCell sx={tableCellStyle(theme)}>{inquiry.id}</TableCell>
                  <TableCell sx={tableCellStyle(theme)}>{inquiry.title}</TableCell>
                  <TableCell sx={tableCellStyle(theme)}>{inquiry.status}</TableCell>
                  <TableCell sx={tableCellStyle(theme)}>{inquiry.inquiryDate}</TableCell>
                  <TableCell sx={tableCellStyle(theme)}>{inquiry.replyDate}</TableCell>
                </CustomTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      {/* 등록 다이얼로그 */}
      <RegisterAlert open={openRegister} handleClose={handleCloseRegister} />
      {/* 답변 다이얼로그 */}
      {selectedInquiry && <ReplyAlert open={openReply} handleClose={handleCloseReply} inquiry={selectedInquiry} />}
    </Box>
  );
};

export default InquiryBoard;
