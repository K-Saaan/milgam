import React, { useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RegisterAlert from './RegisterAlert';
import ReplyAlert from './ReplyAlert';

// 문의 데이터 예시
const inquiries = [
  { id: 1, category: '[카테고리] 제목', title: 'Makeup', status: '대기', inquiryDate: '2024-06-26', replyDate: '' },
  { id: 2, category: '', title: 'Asus Laptop', status: '완료', inquiryDate: '2024-06-20', replyDate: '2024-06-25' },
  { id: 3, category: '', title: 'Iphone X', status: '완료', inquiryDate: '2024-06-15', replyDate: '2024-06-25' },
];

const containerStyle = {
  width: '100%',
  padding: 3,
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 2,
};

const tableHeaderStyle = {
  color: 'white',
};

const tableCellStyle = {
  color: 'white',
};

const InquiryBoard = () => {
  const [openRegister, setOpenRegister] = useState(false);
  const [openReply, setOpenReply] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const handleClickOpenRegister = () => {
    setOpenRegister(true);
  };

  const handleCloseRegister = () => {
    setOpenRegister(false);
  };

  const handleClickOpenReply = (inquiry) => {
    setSelectedInquiry(inquiry);
    setOpenReply(true);
  };

  const handleCloseReply = () => {
    setOpenReply(false);
    setSelectedInquiry(null);
  };

  return (
    <Box sx={containerStyle}>
        <Box sx={headerStyle}>
          <Typography variant="h6">내 문의목록</Typography>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleClickOpenRegister}>
            새 문의
          </Button>
          <RegisterAlert open={openRegister} handleClose={handleCloseRegister} />
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
      {selectedInquiry && <ReplyAlert open={openReply} handleClose={handleCloseReply} inquiry={selectedInquiry} />}
    </Box>
  );
};

export default InquiryBoard;
