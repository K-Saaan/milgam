import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Bar } from 'react-chartjs-2';
import { getBarChartOptions, barChartData } from './charts/BarChartContainer';
import CustomPaper from './styles/CustomPaper'

// 이상행동 카드
const AbnormalBehaviorCard = () => {
  const theme = useTheme();
  const options = getBarChartOptions(theme);

  return (
    <Paper sx={CustomPaper(theme)}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="subtitle1" gutterBottom>
          이상 행동(임시)
        </Typography>
      </Box>
      <div style={{ height: '85%' }}> {/* 높이 조정 */}
        <Bar data={barChartData} options={options} />
      </div>
    </Paper>
  );
};
	

export default AbnormalBehaviorCard;
