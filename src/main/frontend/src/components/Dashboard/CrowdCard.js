import React from 'react';
import { Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CustomCaption from './CustomCaption';
import CustomPaper from './CustomPaper';

// 혼잡도 카드
const CrowdCard = () => {
  const theme = useTheme();

  return (
    <Paper sx={CustomPaper(theme)}>
      <Typography variant="h5" sx={CustomCaption(theme)}>
        혼잡도
      </Typography>
      <Typography variant="caption" sx={CustomCaption(theme)}>
        혼잡도 관련 콘텐츠
      </Typography>
    </Paper>
  );
};

export default CrowdCard;
