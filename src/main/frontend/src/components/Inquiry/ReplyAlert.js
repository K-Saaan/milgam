import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DialogContentText from '@mui/material/DialogContentText';
import Divider from '@mui/material/Divider';
import axios from 'axios';

// 제목 스타일
const titleStyle = (theme) => ({
  fontSize: theme.typography.h6.fontSize,
  fontWeight: theme.typography.h6.fontWeight,
  color: theme.palette.text.primary,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 24px',
});

// 콘텐츠 스타일
const contentStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  padding: '24px',
  color: '#FFFFFF'
};

// 박스 스타일
const boxStyle = (theme) => ({
  color: theme.palette.text.secondary,
  padding: '14px',
  backgroundColor: theme.palette.secondary.main,
  borderRadius: '8px',
  border: `1px solid ${theme.palette.border.primary}`,
  minHeight: '50px',
  borderWidth: '0.2px',
  opacity: 1,
  display: 'flex',
  alignItems: 'center',
});

const ReplyAlert = ({ open, handleClose, inquiryId }) => {
  const theme = useTheme();
  const [inquiry, setInquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open && inquiryId) {
      const fetchInquiry = async () => {
        try {
          setLoading(true);
          // -------------------- url 수정 ------------------------------
          const response = await axios.get(`/myq/questionlist`);
          setInquiry(response.data);
          setLoading(false);
        } catch (err) {
          setError(err);
          setLoading(false);
        }
      };

      fetchInquiry();
    }
  }, [open, inquiryId]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: { borderRadius: "12px", background: theme.palette.background.paper, width: '600px' }
      }}
    >
      <Box sx={titleStyle(theme)}>
        <span>답변</span>
        <IconButton onClick={handleClose} sx={{ color: theme.palette.text.primary }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider style={{background: theme.palette.divider}} />
      <DialogContent sx={contentStyle}>
        <Box>
          <DialogContentText sx={{ marginBottom: '8px' }}>제목</DialogContentText>
          <Typography sx={boxStyle(theme)}>
            {inquiry.question_title}
          </Typography>
        </Box>
        <Box>
          <DialogContentText sx={{ marginBottom: '8px' }}>내용</DialogContentText>
          <Typography sx={boxStyle(theme)}>
            {inquiry.question}
          </Typography>
        </Box>
        <Box>
          <DialogContentText sx={{ marginBottom: '8px' }}>답변</DialogContentText>
          <Typography sx={boxStyle(theme)}>
            {inquiry.answer}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button onClick={handleClose} variant="contained">확인</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ReplyAlert;
