import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, TextField, Autocomplete, Skeleton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useQuery } from 'react-query';
import NaverMap from './NaverMap';
import { fetchData } from '../../api/fetchData';
import { extractLocationName } from '../../api/dataExtractor';
import regions from './data/regions'

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

// Autocomplete 스타일
const autocompleteStyle = (theme) => ({
  minWidth: 280,
  '& .MuiOutlinedInput-root': {
    height: '40px', // 높이를 줄입니다
    '& fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.dark,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.light,
    },
  },
  '& .MuiInputLabel-outlined': {
    color: theme.palette.text.primary,
    textAlign: 'center', // 가운데 정렬
    transform: 'translate(12px, 8px) scale(1)', // 레이블 위치 조정
  },
  '& .MuiInputLabel-outlined.Mui-focused': {
    color: theme.palette.primary.main,
    transform: 'translate(14px, -6px) scale(0.75)', // 포커스 시 레이블 위치 조정
  },
  '& .MuiAutocomplete-input': {
    padding: '10px 14px', // 입력 높이를 줄입니다
  },
});

// MapCard 컴포넌트
const MapCard = () => {
  const theme = useTheme();
  const [locationName, setLocationName] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('광화문·덕수궁');
  const { data, error, isLoading, refetch } = useQuery(['fetchData', selectedRegion], () => fetchData(selectedRegion), {
    refetchInterval: 300000, // 5분마다 갱신
    enabled: !!selectedRegion, // selectedRegion이 있을 때만 쿼리를 실행
  });

  useEffect(() => {
    if (data) {
      console.log('Fetched Data:', data);
      const name = extractLocationName(data);
      setLocationName(name);
    }
  }, [data]);

  const handleRegionChange = (event, newValue) => {
    const regionValue = newValue ? newValue.value : '';
    setSelectedRegion(regionValue); // 선택된 지역을 업데이트합니다
    setLocationName(newValue ? newValue.label : ''); // 선택된 값으로 제목 업데이트
    if (regionValue) {
      refetch(); // 선택한 지역에 대한 데이터를 다시 불러옵니다
    }
  };

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
        {/* 지역 선택 Autocomplete */}
        <Autocomplete
          disablePortal
          id="region-select"
          options={regions}
          getOptionLabel={(option) => option.label}
          value={regions.find(region => region.value === selectedRegion) || null}
          onChange={handleRegionChange}
          sx={autocompleteStyle(theme)}
          renderInput={(params) => (
            <TextField 
              {...params} 
              label="지역 선택" 
              placeholder="지역을 검색하세요." // placeholder 추가
            />
          )}
        />
      </Box>
      <Box sx={boxStyle(theme)}>
        <NaverMap />
      </Box>
    </Paper>
  );
};

export default MapCard;
