import React from 'react';
import { Grid, Box, TextField, Autocomplete } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useQueryClient } from 'react-query';
import CrowdCard from './CrowdCard';
import AbnormalBehaviorCard from './AbnormalBehaviorCard';
import CrowdTrendCard from './CrowdTrendCard';
import CrowdRatioCard from './CrowdRatioCard';
import regions from './data/regions';
import useStore from '../../store';

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

// 대시보드 메인 화면의 좌측 영역
const LeftContentArea = () => {
  const theme = useTheme();
  const { selectedRegion, setSelectedRegion } = useStore();
  const queryClient = useQueryClient();

  // 사용자가 지역을 변경했을 때 호출
  const handleRegionChange = (event, newValue) => {
    const regionValue = newValue ? newValue.value : '광화문·덕수궁';
    setSelectedRegion(regionValue); // 선택된 지역을 업데이트합니다 (useQuery 트리거)
    queryClient.invalidateQueries('fetchData'); // 선택한 지역에 대한 데이터를 다시 불러옵니다
  };

  return (
    <Grid container spacing={2}>
      {/* 상단 Autocomplete */}
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', alignItems: 'right', justifyContent: 'flex-end' }}>
          {/* 지역 선택 Autocomplete */}
          <Autocomplete
            disablePortal
            id="region-select"
            options={regions}
            getOptionLabel={(option) => option.label}
            value={regions.find(region => region.value === selectedRegion) || null}
            onChange={handleRegionChange}
            sx={{
              ...autocompleteStyle(theme),
              position: 'relative',
              top: '-65px', // 원하는 높이만큼 올려줍니다
            }}            renderInput={(params) => (
              <TextField 
                {...params} 
                label="지역 선택" 
                placeholder="지역을 검색하세요." // placeholder 추가
              />
            )}
          />
        </Box>
      </Grid>
      {/* 상단 카드 영역 */}
      <Grid item xs={12} sx={{ position: 'relative', top: '-55px', bottom: '70px' }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CrowdCard />
          </Grid>
          <Grid item xs={6}>
            <AbnormalBehaviorCard />
          </Grid>
          <Grid item xs={6}>
            <CrowdTrendCard />
          </Grid>
          <Grid item xs={6}>
            <CrowdRatioCard />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LeftContentArea;