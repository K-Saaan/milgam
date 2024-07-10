import React, { useState, useEffect } from 'react';
import { Paper, Typography, Skeleton, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useQuery } from 'react-query';
import { fetchData } from '../../api/fetchData';
import { extractPopulationRates } from '../../api/dataExtractor';
import { Pie } from 'react-chartjs-2';
import CustomPaper from './styles/CustomPaper'
import { pieChartDatasetOptions, pieChartOptions } from './charts/PieChartContainer';
import useStore from '../../store'

// Chart.js 요소 등록
import { Chart, ArcElement, Legend, Tooltip } from 'chart.js';
Chart.register(ArcElement, Legend, Tooltip);

// 혼잡비율 카드
const CrowdRatioCard = ({ region }) => {
  const theme = useTheme();
  const { selectedRegion } = useStore(); // 선택된 지역을 Zustand 스토어에서 가져옵니다.
  const { data: xmlData, error, isLoading } = useQuery(['fetchData', selectedRegion], () => fetchData(selectedRegion), {
    refetchInterval: 300000, // 5분마다 갱신
  });
  
  const [populationRates, setPopulationRates] = useState({
    ppltnRate10: 0,
    ppltnRate20: 0,
    ppltnRate30: 0,
    ppltnRate40: 0,
    ppltnRate50: 0,
    ppltnRate60: 0,
    ppltnRate70: 0
  });

  useEffect(() => {
    if (xmlData) {
      const extractedData = extractPopulationRates(xmlData);
      setPopulationRates(extractedData);
    }
  }, [xmlData]);

  // if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  // pie chart 데이터 정의
  const data = {
    labels: ['10대', '20대', '30대', '40대', '50대', '60대', '70대'],
    datasets: [
      {
        data: [
          populationRates.ppltnRate10,
          populationRates.ppltnRate20,
          populationRates.ppltnRate30,
          populationRates.ppltnRate40,
          populationRates.ppltnRate50,
          populationRates.ppltnRate60,
          populationRates.ppltnRate70,
        ],
        ...pieChartDatasetOptions, // 스타일링 옵션 추가
      },
    ],
  };

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
              나이대별 비율
            </Typography>
          </Box>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80%', width: '100%' }}>
            <Pie data={data} options={pieChartOptions(theme)} style={{ position: 'relative', height: '75px', width: '75px' }} />
          </div>
        </>
      )}
    </Paper>
  );
};

export default CrowdRatioCard;
