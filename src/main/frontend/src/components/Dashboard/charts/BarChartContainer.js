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
      },
      grid: {
        color: theme.palette.divider,
      },
    },
  },
});

// 바 차트 데이터 및 스타일 지정
export const barChartData = {
  labels: ['폭행', '절도'],
  datasets: [
    {
      label: '횟수',
      data: [3, 2], // 임시 데이터
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