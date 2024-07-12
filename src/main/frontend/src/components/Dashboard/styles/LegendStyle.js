import React from 'react';
import { Box } from '@mui/material';
import { Chip } from '@mui/material';
import { styled } from '@mui/system';

// 칩 스타일 지정
const CustomChip = styled(Chip)({
  width: '80px', // 칩의 가로 크기
  height: '25px', // 칩의 세로 크기
  borderRadius: '5px', // 칩의 모서리 반경
  margin: '0 4px', // 칩 간의 간격
});

// Legend 컴포넌트
const Legend = () => {
  return (
    <Box sx={{ width: '25%', backgroundColor: 'transparent', padding: '4px', width: 'auto' }}>
      <CustomChip label="매우혼잡" sx={{ backgroundColor: '#EF3826', color: 'white' }} />
      <CustomChip label="혼잡" sx={{ backgroundColor: '#FFA756', color: 'white' }} />
      <CustomChip label="보통" sx={{ backgroundColor: '#E9C157', color: 'white' }} />
      <CustomChip label="여유" sx={{ backgroundColor: '#00B69B', color: 'white' }} />
    </Box>
  );
};

export default Legend;
