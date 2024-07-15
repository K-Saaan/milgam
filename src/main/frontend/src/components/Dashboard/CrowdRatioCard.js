// CrowdRatioCard.js
import React, { useState, useEffect } from 'react';
import { Paper, Skeleton, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useQuery } from 'react-query';
import { fetchData } from '../../api/fetchData';
import { extractPopulationRates } from '../../api/dataExtractor';
import CustomPaper from './styles/CustomPaper';
import PieChartContainer from './charts/PieChartContainer';
import useStore from '../../store';

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
