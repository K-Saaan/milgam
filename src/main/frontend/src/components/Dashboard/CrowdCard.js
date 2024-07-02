import React from 'react';
import { Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const CrowdCard = () => {
  const theme = useTheme();

  return (
    <Paper sx={{ flex: 1, padding: 2, bgcolor: theme.palette.secondary.main, color: theme.palette.text.primary, height: '150px', borderRadius: 2 }}>
      <Typography variant="caption" sx={{ color: theme.palette.text.primary }}>
        혼잡도
      </Typography>
      <Typography variant="caption" sx={{ color: theme.palette.text.primary }}>
        혼잡도 관련 콘텐츠
      </Typography>
    </Paper>
  );
};

export default CrowdCard;
