import React from 'react';
import { Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CustomCaption from './CustomCaption'
import CustomPaper from './CustomPaper'

// 혼잡 추이 카드
const CrowdTrendCard = () => {
  const theme = useTheme();

  return (
    <Paper sx={CustomPaper(theme)}>
      <Typography variant="h5" sx={CustomCaption(theme)}>
        혼잡 추이
      </Typography>
      <Typography variant="caption" sx={CustomCaption(theme)}>
        혼잡 추이 관련 콘텐츠
      </Typography>
    </Paper>
  );
};

export default CrowdTrendCard;
