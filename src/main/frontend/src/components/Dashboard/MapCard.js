import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const MapCard = () => {
  const theme = useTheme();

  return (
    <Paper sx={{ flexGrow: 1, padding: 2, bgcolor: theme.palette.secondary.main, color: theme.palette.text.primary, height: '400px', borderRadius: 2 }}>
      <Typography variant="h6" sx={{ color: theme.palette.text.primary, marginBottom: 1 }}>
        지도
      </Typography>
      <Box sx={{ width: '100%', height: 'calc(100% - 32px)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px dashed ${theme.palette.text.primary}`, boxSizing: 'border-box' }}>
        <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
          지도 영역 (임시)
        </Typography>
      </Box>
    </Paper>
  );
}

export default MapCard;
