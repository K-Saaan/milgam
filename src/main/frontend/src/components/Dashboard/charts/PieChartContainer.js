// 파이 차트 옵션 지정
export const pieChartOptions = (theme) => ({
    maintainAspectRatio: false, // 비율을 유지하지 않고 원하는 크기로 조정
    plugins: {
      legend: {
        display: true,
        position: 'chartArea',
        labels: {
          color: theme.palette.text.primary,
          font: {
            size: 10, // 범례의 글자 크기
          },
          boxWidth: 7, // 범례 상자의 너비
          boxHeight: 7, // 범례 상자의 높이
        },
        maxWidth: 50, // 레전드의 최대 너비 설정
        maxHeight: 50, // 레전드의 최대 높이 설정
      },
    },
  });
  
// 파이 차트 색 지정
  export const pieChartDatasetOptions = {
    backgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
      '#4BC0C0',
      '#9966FF',
      '#FF9F40',
      '#FFCD56',
    ],
    hoverBackgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
      '#4BC0C0',
      '#9966FF',
      '#FF9F40',
      '#FFCD56',
    ],
    borderWidth: 0.5, // 테두리 두께를 0으로 설정
  };
  