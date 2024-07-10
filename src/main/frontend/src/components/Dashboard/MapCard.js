import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, TextField, Autocomplete, Skeleton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useQuery, useQueryClient } from 'react-query';
import NaverMap from './NaverMap';
import { fetchData } from '../../api/fetchData';
import { extractCrowdDataToMap } from '../../api/dataExtractor';
import regions from './data/regions'
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

// 혼잡도 단계별 배경색 지정
const getCrowdColor = (level, theme) => {
  switch (level) {
    case '붐빔':
      return theme.palette.error.main; // 빨강
    case '약간 붐빔':
      return theme.palette.warning.main; // 주황
    case '보통':
      return theme.palette.info.main; // 노랑
    case '여유':
      return theme.palette.success.main; // 초록
    default:
      return theme.palette.background.paper; // 기본 배경색
  }
};

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

  const selectedRegionData = regions.find(region => region.value === selectedRegion) || {};

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
        {/* selectedRegion의 위도, 경도와 혼잡도로 변경 */}
        <NaverMap 
        region={{ lat: selectedRegionData.lat, lng: selectedRegionData.lng }} 
        color={getCrowdColor(crowdLevel, theme)}
        crowdLevel={crowdLevel} /> {/* 혼잡도 레벨을 NaverMap 컴포넌트에 전달 */}
      </Box>
    </Paper>
  );
};

export default MapCard;
