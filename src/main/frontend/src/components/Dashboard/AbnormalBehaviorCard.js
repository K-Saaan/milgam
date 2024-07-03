import React from 'react';
import { Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CustomCaption from './CustomCaption'
import CustomPaper from './CustomPaper'

const AbnormalBehaviorCard = () => {
  const theme = useTheme();

  return (
    <Paper sx={CustomPaper(theme)}>
      <Typography variant="h5" sx={CustomCaption(theme)}>
        이상 행동
      </Typography>
      <Typography variant="caption" sx={CustomCaption(theme)}>
        이상 행동 관련 콘텐츠
      </Typography>
    </Paper>
  );
};

export default AbnormalBehaviorCard;
