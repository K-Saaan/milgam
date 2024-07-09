import React, { useState, useEffect } from 'react';
import { Paper, Typography, Skeleton, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useQuery } from 'react-query';
import { Line } from 'react-chartjs-2';
import { fetchData } from '../../api/fetchData';
import { extractForecastData } from '../../api/dataExtractor';
import CustomPaper from './styles/CustomPaper'
import { getLineChartOptions, lineChartDatasetOptions } from './charts/LineChartContainer';
import useStore from '../../store'

// Chart.js 요소 등록
import { Chart, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';
Chart.register(LineElement, CategoryScale, LinearScale, PointElement);

// 혼잡 추이 카드
const CrowdTrendCard = () => {
  const theme = useTheme();
  const { selectedRegion } = useStore(); // 선택된 지역을 Zustand 스토어에서 가져옵니다.
  const { data: xmlData, error, isLoading } = useQuery(['fetchData', selectedRegion], () => fetchData(selectedRegion), {
    refetchInterval: 300000, // 5분마다 갱신
  });

  const [forecastData, setForecastData] = useState([]);

  useEffect(() => {
    if (xmlData) {
      const extractedData = extractForecastData(xmlData);
      setForecastData(extractedData);
    }
  }, [xmlData]);

  // if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  // 날짜와 시간을 분리하여 라벨로 사용
  const labels = forecastData.map(forecast => forecast.time.split(' ')[1]);

  const data = {
    labels: labels,
    datasets: [
      {
        ...lineChartDatasetOptions.ppltnMin,
        data: forecastData.map(forecast => forecast.ppltnMin)
      },
      {
        ...lineChartDatasetOptions.ppltnMax,
        data: forecastData.map(forecast => forecast.ppltnMax)
      }
    ]
  };

  const options = getLineChartOptions(theme);

  return (
    <Paper sx={CustomPaper(theme)}>
      {/* 로딩중 스켈레톤 적용 */}
      {isLoading ? (
        <Box>
          <Skeleton variant="text" width="60px" height="28px" />
          <Skeleton variant="text" width="100px" height="20px" />
          <Skeleton variant="text" width="80%" height="18px" />
        </Box>
      ) : (
        <>
          <Typography variant="subtitle2">
            인구 예측 추이
          </Typography>
          <Line data={data} options={options}/>
        </>
      )}
    </Paper>
  );
};

export default CrowdTrendCard;
