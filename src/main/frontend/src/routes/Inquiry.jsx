import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import InquiryBoard from '../components/Inquery/InqueryBoard';

// 문의 데이터 예시
const inquiries = [
  { id: 1, category: '[카테고리] 제목', title: 'Makeup', status: '대기', inquiryDate: '2024-06-26', replyDate: '' },
  { id: 2, category: '', title: 'Asus Laptop', status: '완료', inquiryDate: '2024-06-20', replyDate: '2024-06-25' },
  { id: 3, category: '', title: 'Iphone X', status: '완료', inquiryDate: '2024-06-15', replyDate: '2024-06-25' },
];

const Inquiry = () => {
  return (
    <>
      <InquiryBoard />
    </>
  );
};

export default Inquiry;
