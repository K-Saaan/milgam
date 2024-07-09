import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Select, MenuItem, FormControl, InputLabel, Skeleton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useQuery } from 'react-query';
import NaverMap from './NaverMap';
import { fetchData } from '../../api/fetchData';
import { extractLocationName } from '../../api/dataExtractor';

// 지도 영역 바깥 컨테이너 스타일
const paperStyle = (theme) => ({
  flexGrow: 1,
  padding: 2,
  bgcolor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  height: '380px',
  borderRadius: 2,
});

// 제목 스타일
const typographyStyle = (theme) => ({
  color: theme.palette.text.primary,
  marginBottom: 2,
});

// 지도 영역 스타일
const boxStyle = (theme) => ({
  width: '100%',
  height: 'calc(100% - 50px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxSizing: 'border-box',
});

// MapCard 컴포넌트
const MapCard = () => {
  const theme = useTheme();
  const { data, error, isLoading } = useQuery('fetchData', fetchData, {
    refetchInterval: 300000, // 5분마다 갱신
  });
  const [locationName, setLocationName] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  // 서울 실시간 도시 데이터 API 제공 장소
  const regions = [
    { label: '광화문·덕수궁', value: '광화문·덕수궁' },
    // ... 나머지 114개의 지역 추가
  ];

  useEffect(() => {
    if (data) {
      console.log('Fetched Data:', data);
      const name = extractLocationName(data);
      setLocationName(name);
    }
  }, [data]);

  const handleRegionChange = (event) => {
    setSelectedRegion(event.target.value);
    // 선택한 지역에 대한 데이터를 다시 불러오는 로직 추가
  };

  // if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <Paper sx={paperStyle(theme)}>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* 로딩중 스켈레톤 적용 */}
        {isLoading ? (
          <Skeleton variant="text" width={100} height={50} />
        ) : (
          <Typography variant="h6" sx={typographyStyle(theme)}>
            {locationName}
          </Typography>
        )}
        {/* 지역 선택 드롭박스 */}
        <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="region-select-label">지역 선택</InputLabel>
          <Select
            labelId="region-select-label"
            value={selectedRegion}
            onChange={handleRegionChange}
            label="지역 선택"
          >
            {regions.map((region) => (
              <MenuItem key={region.value} value={region.value}>
                {region.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={boxStyle(theme)}>
        <NaverMap />
      </Box>
    </Paper>
  );
};

export default MapCard;
