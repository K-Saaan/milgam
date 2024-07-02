import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Paper, Typography, Button, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const LeftContentAreaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();

  // 여기에 id에 따른 내용을 설정합니다.
  // 예시로 간단한 데이터를 설정하였습니다.
  const alertDetails = {
    1: '2구역에서 Lv.1 이상 행동이 감지되었습니다. 자세한 내용은 ...',
    2: '5구역에서 Lv.3 혼잡이 발생했습니다. 자세한 내용은 ...',
  };

  const handleCloseClick = () => {
    navigate('/dashboard');
  };

  return (
    <Paper sx={{ flexGrow: 1, padding: 2, bgcolor: theme.palette.secondary.main, color: theme.palette.text.primary, height: '400px', borderRadius: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>
          알림 상세 내용
        </Typography>
        <Button variant="contained" color="primary" onClick={handleCloseClick}>
          닫기
        </Button>
      </Box>
      <Typography variant="body1" sx={{ color: theme.palette.text.primary }}>
        {alertDetails[id] || '알림 상세 내용을 찾을 수 없습니다.'}
      </Typography>
    </Paper>
  );
};

export default LeftContentAreaDetail;
