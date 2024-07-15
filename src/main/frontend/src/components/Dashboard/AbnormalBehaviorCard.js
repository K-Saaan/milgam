import React from 'react';
import { Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import CustomPaper from './styles/CustomPaper';
import BarChartContainer from './charts/BarChartContainer';

// 이상행동 카드
const AbnormalBehaviorCard = () => {
  const theme = useTheme();

  return (
    <Paper sx={CustomPaper(theme)}>
      <BarChartContainer />
    </Paper>
  );
};

export default AbnormalBehaviorCard;
