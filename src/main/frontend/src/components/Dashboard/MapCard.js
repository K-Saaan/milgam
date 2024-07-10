import React, { useEffect  } from 'react';
import { Box, Paper, Typography, TextField, Autocomplete, Skeleton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useQuery, useQueryClient } from 'react-query';
import NaverMap from './NaverMap';
import { fetchData } from '../../api/fetchData';
import regions from './data/regions'
import useStore from '../../store'


// 지도 영역 바깥 컨테이너 스타일
const paperStyle = (theme) => ({
  flexGrow: 1,
  padding: 2,
  bgcolor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  height: '380px',
  borderRadius: 2,
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

// Autocomplete 스타일
const autocompleteStyle = (theme) => ({
  minWidth: 280,
  '& .MuiOutlinedInput-root': {
    height: '40px', // 높이를 줄입니다
    '& fieldset': {
      borderColor: theme.palette.primary.main,
      '& legend': {
        width: 'auto', // 레이블이 있는 경우 노치 크기
      },
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.dark,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
  '& .MuiInputLabel-outlined': {
    color: theme.palette.primary.main,
    textAlign: 'center', // 가운데 정렬
    transform: 'translate(14px, -6px) scale(0.75)', // 포커스된 상태를 기본 상태로 설정
  },
  '& .MuiInputLabel-outlined.Mui-focused': {
    color: theme.palette.primary.main,
  },
  '& .MuiAutocomplete-input': {
    padding: '10px 14px', // 입력 높이를 줄입니다
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
});

// MapCard 컴포넌트
const MapCard = () => {
  const theme = useTheme();
  const { selectedRegion, setSelectedRegion } = useStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!selectedRegion) {
      setSelectedRegion('광화문·덕수궁');
    }
  }, [selectedRegion, setSelectedRegion]);

  
  // React Query를 사용하여 selectedRegion이 변경될 때마다 데이터를 가져옴
  const { error, isLoading } = useQuery(['fetchData', selectedRegion], () => fetchData(selectedRegion), {
    refetchInterval: 300000, // 5분마다 갱신
    enabled: !!selectedRegion, // selectedRegion이 있을 때만 쿼리를 실행
  });

  // 사용자가 지역을 변경했을 때 호출
  const handleRegionChange = (event, newValue) => {
    const regionValue = newValue ? newValue.value : '광화문·덕수궁';
    setSelectedRegion(regionValue); // 선택된 지역을 업데이트합니다 (useQuery 트리거)
    queryClient.invalidateQueries('fetchData'); // 선택한 지역에 대한 데이터를 다시 불러옵니다
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
            {selectedRegion}
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
