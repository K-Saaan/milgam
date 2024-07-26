import React, { useState } from 'react';
import { Paper, Typography, Box, Skeleton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Bar } from 'react-chartjs-2';
import { getBarChartOptions } from './charts/BarChartContainer';
import { AlertManager, SseComponent } from './AlertManager';
import CustomPaper from './styles/CustomPaper'

/**
 * 1. ClassName: AbnormalBehaviorCard
 * 2. FileName : AbnormalBehaviorCard.js
 * 3. Package  : components.AbnormalBehaviorCard
 * 4. Comment  : 대시보드 이상행동 카드
 * 5. 작성자   : mijin
 * 6. 작성일   : 2024. 07. 12
 **/

// 초기 바 차트 데이터
const initialBarChartData = {
  labels: ['폭행', '실신'],
  datasets: [
    {
      label: '횟수',
      data: [0, 0], // 초기 데이터
      backgroundColor: [
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
      ],
      borderWidth: 1,
    },
  ],
};

// 이상행동 카드
const AbnormalBehaviorCard = () => {
  const theme = useTheme();
  const options = getBarChartOptions(theme);
  const [barChartData, setBarChartData] = useState(initialBarChartData);
  const [isDataEmpty, setIsDataEmpty] = useState(true);
  const [loading, setLoading] = useState(true);

  const handleSetAlerts = (alerts) => {
    const newBarChartData = { 
      ...initialBarChartData, 
      datasets: [{ 
        ...initialBarChartData.datasets[0], 
        data: [0, 0] 
      }] 
    };

    Object.values(alerts).forEach(alertList => {
      alertList.forEach(log => {
        if (log.context.includes('폭행')|| log.context.includes('폭력')) {
          newBarChartData.datasets[0].data[0] += 1;
        }
        if (log.context.includes('실신')) {
          newBarChartData.datasets[0].data[1] += 1;
        }
      });
    });

    // 0이 아닌 데이터만 필터링
    const filteredData = newBarChartData.datasets[0].data
      .map((value, index) => ({ value, index }))
      .filter(data => data.value > 0);

    if (filteredData.length > 0) {
      const filteredLabels = filteredData.map(data => newBarChartData.labels[data.index]);
      const filteredValues = filteredData.map(data => data.value);

      setBarChartData({
        labels: filteredLabels,
        datasets: [{
          ...newBarChartData.datasets[0],
          data: filteredValues,
        }],
      });
      setIsDataEmpty(false);
    } else {
      setIsDataEmpty(true);
    }
    setLoading(false);
  };


  return (
    <Paper sx={CustomPaper(theme)}>
      <AlertManager setAlerts={handleSetAlerts} setLoading={setLoading} />
      <SseComponent setAlerts={handleSetAlerts} />
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="subtitle1" gutterBottom>
          이상 행동
        </Typography>
      </Box>
      <div style={{ height: '85%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {loading ? (
          <Skeleton variant="rectangular" width="80%" height="80%" />
        ) : (
          isDataEmpty ? (
            <Typography
              variant="subtitle2"
              sx={{
                padding: '10px',
                paddingLeft: '40px', // 왼쪽 패딩을 키웁니다
                paddingRight: '40px', // 오른쪽 패딩을 키웁니다
                borderRadius: '4px',
                margin: '4px 0', // 위아래 margin 조정
                display: 'inline-block' // 아랫줄로 내려쓰기 위해 display 변경
              }}
            >
              감지된 이상행동이 없어요.
            </Typography>
          ) : (
            <Bar data={barChartData} options={options} />
          )
        )}
      </div>
    </Paper>
  );
};
	

export default AbnormalBehaviorCard;
