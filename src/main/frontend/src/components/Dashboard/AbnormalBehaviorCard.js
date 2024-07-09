import React from 'react';
import { Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CustomPaper from './styles/CustomPaper'

// 이상행동 카드
const AbnormalBehaviorCard = () => {
  const theme = useTheme();

  return (
    <Paper sx={CustomPaper(theme)}>
      <Typography variant="subtitle2">
        이상 행동
      </Typography>
      <Typography 
        sx={{
          color: theme.palette.text.primary,
          fontSize: '0.75rem',        
        }}
      >
        이상 행동 관련 콘텐츠
      </Typography>
    </Paper>
  );
};

export default AbnormalBehaviorCard;
