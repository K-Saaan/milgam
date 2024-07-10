// 라인 차트 옵션 지정
export const getLineChartOptions = (theme) => ({
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'right',
      labels: {
        color: theme.palette.text.primary,
        font: {
          size: 5 // 범례의 글자 크기
        },
        boxWidth: 5, // 범례 상자의 너비
        boxHeight: 5, // 범례 상자의 높이
      },
      maxWidth: 50, // 레전드의 최대 너비 설정
      maxHeight: 50, // 레전드의 최대 높이 설정
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
      type: 'category',
      title: {
        display: false,
        text: '시간',
        color: theme.palette.text.primary,
      },
      ticks: {
        color: theme.palette.text.primary,
        font: {
          size: 10
        }
      },
      grid: {
        display: false,
      },
    },
    y: {
      title: {
        display: false,
        text: '인구수',
        color: theme.palette.text.primary,
      },
      ticks: {
        color: theme.palette.text.primary,
        font: {
          size: 10
        }
      },
      grid: {
        color: theme.palette.divider,
      },
    },
  },
});

// 라인 차트 색 및 스타일 지정
export const lineChartDatasetOptions = {
  ppltnMin: {
    label: '예측 인구수 (최소)',
    fill: false,
    borderColor: 'rgba(75,192,192,1)',
    backgroundColor: 'rgba(75,192,192,0.2)',
    pointBackgroundColor: 'rgba(75,192,192,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(75,192,192,1)',
    tension: 0.4
  },
  ppltnMax: {
    label: '예측 인구수 (최대)',
    fill: false,
    borderColor: 'rgba(153,102,255,1)',
    backgroundColor: 'rgba(153,102,255,0.2)',
    pointBackgroundColor: 'rgba(153,102,255,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(153,102,255,1)',
    tension: 0.4
  }
};
