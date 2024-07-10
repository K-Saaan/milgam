import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, TextField, Autocomplete, Skeleton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useQuery, useQueryClient } from 'react-query';
import NaverMap from './NaverMap';
import { fetchData } from '../../api/fetchData';
// import regions from './data/regions'
import { extractCrowdDataToMap } from '../../api/dataExtractor';
import useStore from '../../store'

// 지도 영역 바깥 컨테이너 스타일
const paperStyle = (theme) => ({
  flexGrow: 1,
  padding: 2,
  bgcolor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  height: '500px',
  borderRadius: 2,
  position: 'relative',
  top: '-80px', // 원하는 만큼 높이 조정
});

// 타이틀 스타일
const typographyStyle = (theme) => ({
  color: theme.palette.text.primary,
  marginBottom: 1,
});

// 지도 영역 스타일
const boxStyle = (theme) => ({
  width: '100%',
  height: 'calc(100% - 50px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
  marginTop: '6px'
});

// MapCard 컴포넌트
const MapCard = () => {
  const theme = useTheme();
  const { selectedRegion, setSelectedRegion } = useStore();
  const queryClient = useQueryClient();
  const [crowdLevel, setCrowdLevel] = useState(''); // 혼잡도 레벨 상태 추가

  useEffect(() => {
    if (!selectedRegion) {
      setSelectedRegion('광화문·덕수궁');
    }
  }, [selectedRegion, setSelectedRegion]);

  // React Query를 사용하여 selectedRegion이 변경될 때마다 데이터를 가져옴
  const { data: jsonData, error, isLoading } = useQuery(['fetchData', selectedRegion], () => fetchData(selectedRegion), {
    refetchInterval: 300000, // 5분마다 갱신
    enabled: !!selectedRegion, // selectedRegion이 있을 때만 쿼리를 실행
  });

  useEffect(() => {
    if (jsonData) {
      const { areaCongestLvl } = extractCrowdDataToMap(jsonData);
      setCrowdLevel(areaCongestLvl); // 혼잡도 레벨 설정
    }
  }, [jsonData]);

  if (error) return <div>Error fetching data</div>;

  return (
    <Paper sx={paperStyle(theme)}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* 로딩중 스켈레톤 적용 */}
        {isLoading ? (
          <Skeleton variant="text" width={100} height={50} />
        ) : (
          <Typography variant="h6" sx={typographyStyle(theme)}>
            {selectedRegion}
          </Typography>
        )}
      </Box>
      <Box sx={boxStyle(theme)}>
        <NaverMap crowdLevel={crowdLevel} /> {/* 혼잡도 레벨을 NaverMap 컴포넌트에 전달 */}
      </Box>
    </Paper>
  );
};

export default MapCard;
