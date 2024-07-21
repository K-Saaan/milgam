// charts/PieChartContainer.js
import React from 'react';
import ApexCharts from 'react-apexcharts';
import { Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// 파이 차트 옵션 지정
export const pieChartOptions = (theme) => ({
  chart: {
    type: 'donut',
    height: '100%', // 차트의 높이를 100%로 조정하여 더 크게 표시
  },
  labels: ['10대', '20대', '30대', '40대', '50대', '60대', '70대'],
  legend: {
    position: 'bottom', // 범례를 하단으로 이동
    labels: {
      colors: theme.palette.text.primary,
    },
    itemMargin: {
      horizontal: 5,
      vertical: 5, // 각 범례 항목 간의 수직 간격 조정
    },
    fontSize: '11px',
    markers: {
      width: 12,
      height: 12,
    },
  },
  tooltip: {
    y: {
      formatter: (val) => `${val}%`,
    },
    theme: 'dark',
  },
  colors: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#FFCD56'],
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: false,
        },
      },
    },
  },
  dataLabels: {
    enabled: true,
    formatter: function (val, opts) {
      return `${val.toFixed(1)}%`;
    },
    style: {
      colors: [theme.palette.text.primary],
    },
    dropShadow: {
      enabled: false,
    },
  },
  stroke: {
    show: true,
    width: 0, // 테두리 두께를 0으로 설정하여 흰색 테두리 제거
  },
});

const PieChartContainer = ({ data }) => {
  const theme = useTheme();
  const options = pieChartOptions(theme);

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Box sx={{ textAlign: 'center', marginBottom: '8px' }}>
        <Typography variant="subtitle1" gutterBottom>
          나이대별 비율
        </Typography>
      </Box>
      <div style={{ height: '100%', width: '100%' }}>
        <ApexCharts
          options={options}
          series={data}
          type="donut"
          height="100%"
          width="100%"
        />
      </div>
    </div>
  );
};

export default PieChartContainer;
