import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// 지도 영역 바깥 컨테이너 스타일
const paperStyle = (theme) => ({
  flexGrow: 1,
  padding: 2,
  bgcolor: theme.palette.secondary.main,
  color: theme.palette.text.primary,
  height: '380px',
  borderRadius: 2,
});

// 제목 스타일
const typographyStyle = (theme) => ({
  color: theme.palette.text.primary,
  marginBottom: 1,
});

// 지도 임시 영역 스타일
const boxStyle = (theme) => ({
  width: '100%',
  height: 'calc(100% - 50px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: `1px dashed ${theme.palette.text.primary}`,
  boxSizing: 'border-box',
});

const MapCard = () => {
  const theme = useTheme();

  return (
    <Paper sx={paperStyle(theme)}>
      <Typography variant="h6" sx={typographyStyle(theme)}>
        지도
      </Typography>
      <Box sx={boxStyle(theme)}>
        <Typography variant="h6" sx={typographyStyle(theme)}>
          지도 영역 (임시)
        </Typography>
      </Box>
    </Paper>
  );
};

export default MapCard;
