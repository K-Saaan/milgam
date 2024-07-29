import { Box, Paper, Skeleton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { useQueries } from 'react-query';
import { extractCrowdDataToMap } from '../../api/dataExtractor';
import { fetchData } from '../../api/fetchData';
import useStore from '../../store';
import regions from './data/regions';
import NaverMap from './NaverMap';
import Legend from './styles/LegendStyle';

/**
 * 1. ClassName: MapCard
 * 2. FileName : MapCard.js
 * 3. Package  : components.MapCard
 * 4. Comment  : 대시보드 지도 카드
 * 5. 작성자   : mijin
 * 6. 작성일   : 2024. 07. 02
 **/


// 지도 영역 바깥 컨테이너 스타일
const paperStyle = (theme) => ({
  flexGrow: 1,
  padding: 2,
  bgcolor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  height: '600px',
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
      return theme.palette.crowd.busy; // 빨강
    case '약간 붐빔':
      return theme.palette.crowd.slightlyBusy; // 주황
    case '보통':
      return theme.palette.crowd.normal; // 노랑
    case '여유':
      return theme.palette.crowd.relaxed; // 초록
    default:
      return theme.palette.background.paper; // 기본 배경색
  }
};

// 선택한 장소의 주변 장소를 계산하는 함수
const getNearbyRegionsByCenter = (center, regions, radius = 0.02) => {
  if (!center) return [];

  return regions.filter(region => {
    const distance = Math.sqrt(
      Math.pow(region.lat - center.lat, 2) +
      Math.pow(region.lng - center.lng, 2)
    );
    return distance <= radius;
  });
};

// MapCard 컴포넌트
const MapCard = () => {
  const theme = useTheme();
  const { selectedRegion, setSelectedRegion, mapCenter, setMapCenter } = useStore();
  const [crowdData, setCrowdData] = useState({});
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    if (!selectedRegion) {
      setSelectedRegion('광화문·덕수궁');
      setMapCenter({ lat: 37.5759, lng: 126.9769 }); // 광화문·덕수궁의 중심 좌표
    } else {
      const selectedRegionData = regions.find(region => region.value === selectedRegion) || {};
      setMapCenter({ lat: selectedRegionData.lat, lng: selectedRegionData.lng });
    }
  }, [selectedRegion, setSelectedRegion, setMapCenter]);
  const nearbyRegions = getNearbyRegionsByCenter(mapCenter, regions);



  const queries = nearbyRegions.map(region => ({
    queryKey: ['fetchData', region.value],
    queryFn: () => fetchData(region.value),
    staleTime: 300000,
  }));

  const results = useQueries(queries);


  /**
   * 1. MethodName: -
   * 2. ClassName : MapCard
   * 3. Comment   : 지도, 혼잡도 통신
   * 4. 작성자    : mijin
   * 5. 작성일    : 2024. 07. 12
   **/
  useEffect(() => {
    if (results.every(result => !result.isLoading)) {
      const newCrowdData = {};
      results.forEach((result, index) => {
        if (result.data) {
          const regionName = nearbyRegions[index].value;
          const { areaCongestLvl } = extractCrowdDataToMap(result.data);
          newCrowdData[regionName] = areaCongestLvl;
        }
      });
      setCrowdData(newCrowdData); // 무한 루프 걸리 곳!!!
      setIsFetching(false);
    }
  }, [results, nearbyRegions]);

  if (isFetching) return <Skeleton variant="rectangular" width="100%" height="100%" />;

  return (
    <Paper sx={paperStyle(theme)}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {isFetching ? (
          <Skeleton variant="text" width={100} height={50} />
        ) : (
          <Typography variant="h6" sx={typographyStyle(theme)}>
            {selectedRegion}
          </Typography>
        )}
        <Legend /> {/* Legend 컴포넌트 추가 */}
      </Box>
      <Box sx={boxStyle(theme)}>
        <NaverMap 
          mapCenter={mapCenter}
          setMapCenter={setMapCenter}
          crowdData={crowdData}
          getCrowdColor={(level) => getCrowdColor(level, theme)}
        />
      </Box>
    </Paper>
  );
};

export default MapCard;
