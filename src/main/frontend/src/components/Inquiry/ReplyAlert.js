import * as React from 'react';
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

/**
 * 1. FunctionName: ReplyAlert
 * 2. FileName : ReplyAlert.js
 * 3. Package  : components.ReplyAlert
 * 4. Comment  : 답변 확인 알림 창
 * 5. 작성자   : mijin
 * 6. 작성일   : 2024. 07. 19
 **/
const ReplyAlert = ({ open, handleClose, inquiry  }) => {
  const theme = useTheme();

  if (!inquiry) {
    return null;
  }

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
