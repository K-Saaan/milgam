import React from 'react';
import ApexCharts from 'react-apexcharts';
import { Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// 바 차트 데이터 및 스타일 지정
export const barChartData = {
  labels: ['폭행', '절도'],
  series: [
    {
      name: '횟수',
      data: [3, 2], // 임시 데이터
    },
  ],
};

// 바 차트 옵션 지정
export const getBarChartOptions = (theme) => ({
  chart: {
    type: 'bar',
    toolbar: {
      show: false,
    },
    foreColor: theme.palette.text.primary,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '50%',
      endingShape: 'rounded',
      distributed: true, // 막대별로 다른 색상을 적용하기 위해 distributed 옵션 추가
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent'],
  },
  xaxis: {
    categories: barChartData.labels,
    labels: {
      style: {
        colors: theme.palette.text.primary,
      },
    },
  },
  yaxis: {
    title: {
      text: '횟수',
      style: {
        color: theme.palette.text.primary,
      },
    },
    labels: {
      style: {
        colors: theme.palette.text.primary,
      },
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: (val) => `${val}`,
    },
    theme: 'dark', // 툴팁의 배경색
  },
  colors: ['#1f77b4', '#ff7f0e'], // 막대별 색상 지정
  legend: {
    show: false, // legend 숨김 설정
  },
});

const BarChartContainer = () => {
  const theme = useTheme();
  const options = getBarChartOptions(theme);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Box sx={{ textAlign: 'center'}}>
        <Typography variant="subtitle1">
          이상 행동(임시)
        </Typography>
      </Box>
      <ApexCharts
        options={options}
        series={barChartData.series}
        type="bar"
        height="90%"
      />
    </div>
  );
};

export default BarChartContainer;
