import { Box, Paper, Skeleton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useQuery } from 'react-query';
import { extractForecastData } from '../../api/dataExtractor';
import { fetchData } from '../../api/fetchData';
import useStore from '../../store';
import { getLineChartOptions, lineChartDatasetOptions } from './charts/LineChartContainer';
import CustomPaper from './styles/CustomPaper';

/**
 * 1. ClassName: CrowdTrendCard
 * 2. FileName : CrowdTrendCard.js
 * 3. Package  : components.CrowdTrendCard
 * 4. Comment  : 대시보드 혼잡도 추이 카드
 * 5. 작성자   : mijin
 * 6. 작성일   : 2024. 07. 12
 **/

// Chart.js 요소 등록
import { CategoryScale, Chart, LinearScale, LineElement, PointElement } from 'chart.js';
Chart.register(LineElement, CategoryScale, LinearScale, PointElement);

// 혼잡 추이 카드
const CrowdTrendCard = () => {
  const theme = useTheme();
  const { selectedRegion } = useStore(); // 선택된 지역을 Zustand 스토어에서 가져옵니다.
  const { data: jsonData, error, isLoading } = useQuery(['fetchData', selectedRegion], () => fetchData(selectedRegion), {
    refetchInterval: 300000, // 5분마다 갱신
  });
  const [forecastData, setForecastData] = useState([]);

  /**
   * 1. MethodName: -
   * 2. ClassName : CrowdTrendCard
   * 3. Comment   : 혼잡도 추이 통신
   * 4. 작성자    : mijin
   * 5. 작성일    : 2024. 07. 12
   **/
  useEffect(() => {
    if (jsonData) {
      const extractedData = extractForecastData(jsonData);
      setForecastData(extractedData);
    }
  }, [jsonData]);

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
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle1" gutterBottom>
              인구 예측 추이
            </Typography>
          </Box>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '85%', width: '100%' }}>
            <Line data={data} options={options}/>
          </div>
        </>
      )}
    </Paper>
  );
};

export default CrowdTrendCard;
