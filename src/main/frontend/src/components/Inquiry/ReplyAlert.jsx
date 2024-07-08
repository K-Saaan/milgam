import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

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
  color: theme.palette.text.primary,
  padding: '8px',
  backgroundColor: '#323D4E',
  borderRadius: '8px',
  border: `1px solid ${theme.palette.background.paper}`,
  minHeight: '50px'
});

const ReplyAlert = ({ open, handleClose, inquiry }) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      // 다이얼로그 스타일
      PaperProps={{
        sx: { borderRadius: "12px", background: '#273142', width: '600px' }
      }}
    >
      <Box sx={titleStyle(theme)}>
        <span>답변</span>
        <IconButton onClick={handleClose} sx={{ color: theme.palette.text.primary }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent sx={contentStyle}>
        <Box>
          <Typography variant="caption" sx={{ color: theme.palette.text.primary, marginBottom: '8px' }}>제목</Typography>
          <Typography sx={boxStyle(theme)}>
            {inquiry.title}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" sx={{ color: theme.palette.text.primary, marginBottom: '8px' }}>내용</Typography>
          <Typography sx={boxStyle(theme)}>
            {inquiry.content}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" sx={{ color: theme.palette.text.primary, marginBottom: '8px' }}>답변</Typography>
          <Typography sx={boxStyle(theme)}>
            {inquiry.reply}
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
