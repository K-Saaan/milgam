import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// 바 차트 옵션 지정
export const getBarChartOptions = (theme) => ({
  responsive: true,
  maintainAspectRatio: false, // 비율을 유지하지 않음
  plugins: {
    legend: {
      display: false,
      position: 'top',
    },
    tooltip: {
      enabled: true,
      backgroundColor: theme.palette.background.default,
      titleColor: theme.palette.text.primary,
      bodyColor: theme.palette.text.primary,
    },
  },
  scales: {
    x: {
      title: {
        display: false,
        text: '유형',
        color: theme.palette.text.primary,
      },
      ticks: {
        color: theme.palette.text.primary,
      },
      grid: {
        display: false,
      },
    },
    y: {
      title: {
        display: false,
        text: '횟수',
        color: theme.palette.text.primary,
      },
      ticks: {
        color: theme.palette.text.primary,
        stepSize: 1,
      },
      grid: {
        color: theme.palette.divider,
      },
    },
  },
});
