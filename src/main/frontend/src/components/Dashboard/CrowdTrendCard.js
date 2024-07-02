import React from 'react';
import { Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const CrowdTrendCard = () => {
  const theme = useTheme();

  return (
    <Paper sx={{ flex: 1, padding: 2, bgcolor: theme.palette.secondary.main, color: theme.palette.text.primary, height: '150px', borderRadius: 2 }}>
      <Typography variant="caption" sx={{ color: theme.palette.text.primary }}>
        혼잡 추이
      </Typography>
      <Typography variant="caption" sx={{ color: theme.palette.text.primary }}>
        혼잡 추이 관련 콘텐츠
      </Typography>
    </Paper>
  );
};

export default CrowdTrendCard;
