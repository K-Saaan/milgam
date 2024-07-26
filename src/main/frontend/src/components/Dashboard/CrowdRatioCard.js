import { Box, Paper, Skeleton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { extractPopulationRates } from '../../api/dataExtractor';
import { fetchData } from '../../api/fetchData';
import useStore from '../../store';
import PieChartContainer from './charts/PieChartContainer';
import CustomPaper from './styles/CustomPaper';

/**
 * 1. ClassName: CrowdRatioCard
 * 2. FileName : CrowdRatioCard.js
 * 3. Package  : components.CrowdRatioCard
 * 4. Comment  : 대시보드 인구 비율 카드
 * 5. 작성자   : mijin
 * 6. 작성일   : 2024. 07. 12
 **/

const CrowdRatioCard = () => {
  const theme = useTheme();
  const { selectedRegion } = useStore(); // 선택된 지역을 Zustand 스토어에서 가져옴
  const { data: jsonData, error, isLoading } = useQuery(['fetchData', selectedRegion], () => fetchData(selectedRegion), {
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
    if (jsonData) {
      const extractedData = extractPopulationRates(jsonData);
      setPopulationRates(extractedData);
    }
  }, [jsonData]);

  if (error) return <div>Error fetching data</div>;

  const data = [
    populationRates.ppltnRate10,
    populationRates.ppltnRate20,
    populationRates.ppltnRate30,
    populationRates.ppltnRate40,
    populationRates.ppltnRate50,
    populationRates.ppltnRate60,
    populationRates.ppltnRate70,
  ];

  return (
    <Paper sx={CustomPaper(theme)}>
      {isLoading ? (
        <Box>
          <Skeleton variant="text" width="60px" height="28px" />
          <Skeleton variant="text" width="100px" height="20px" />
          <Skeleton variant="text" width="80%" height="18px" />
        </Box>
      ) : (
        <div style={{ height: '90%', width: '100%' }}> {/* 차트의 크기를 적절히 조정 */}
          <PieChartContainer data={data} />
        </div>
      )}
    </Paper>
  );
};

export default CrowdRatioCard;
