import React, { useState } from 'react';
import { Box, Paper, Typography, List, ListItem, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; 
import MailIcon from '@mui/icons-material/Mail'; 
import { useTheme } from '@mui/material/styles';

// Dashboard 컴포넌트: 대시보드 화면을 구성하는 컴포넌트
const Dashboard = () => {
  const theme = useTheme();
  const [selectedAlert, setSelectedAlert] = useState(null); // 선택된 알림을 관리하는 상태

  // 알림 항목 클릭 시 호출되는 함수
  const handleAlertClick = (alert) => {
    setSelectedAlert(alert);
  };

  // 닫기 아이콘 클릭 시 호출되는 함수
  const handleCloseClick = () => {
    setSelectedAlert(null);
  };

  // 기본 콘텐츠를 렌더링하는 함수
  const renderDefaultContent = () => (
    <>
      <Box sx={{ display: 'flex', gap: 2 }}>
        {/* 혼잡도, 이상 행동, 혼잡 추이, 혼잡 비율 박스 */}
        <Paper sx={{ flex: 1, padding: 2, bgcolor: theme.palette.secondary.main, color: theme.palette.text.primary, height: '150px', borderRadius: 2 }}>
          혼잡도
        </Paper>
        <Paper sx={{ flex: 1, padding: 2, bgcolor: theme.palette.secondary.main, color: theme.palette.text.primary, height: '150px' , borderRadius: 2}}>
          이상 행동
        </Paper>
        <Paper sx={{ flex: 1, padding: 2, bgcolor: theme.palette.secondary.main, color: theme.palette.text.primary, height: '150px' , borderRadius: 2}}>
          혼잡 추이
        </Paper>
        <Paper sx={{ flex: 1, padding: 2, bgcolor: theme.palette.secondary.main, color: theme.palette.text.primary, height: '150px' , borderRadius: 2}}>
          혼잡 비율
        </Paper>
      </Box>
      {/* 지도 박스 */}
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
    </>
  );

  // 알림이 선택되었을 때의 콘텐츠를 렌더링하는 함수
  const renderAlertContent = () => (
    <Paper sx={{ padding: 2, bgcolor: theme.palette.secondary.main, color: theme.palette.text.primary, borderRadius: 2, height: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ color: theme.palette.text.primary }}>{selectedAlert.title}</Typography>
        {/* 닫기 아이콘 */}
        <IconButton onClick={handleCloseClick} sx={{ color: theme.palette.text.primary }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Typography variant="body1" sx={{ color: theme.palette.text.primary, marginTop: 2 }}>{selectedAlert.details}</Typography>
    </Paper>
  );

  // 알림 목록
  const alerts = [
    { id: 1, time: '12:53', title: '2구역 Lv.1 이상 행동 감지', details: '2구역에서 이상 행동이 감지되었습니다. 자세한 내용은 여기 있습니다.' },
    { id: 2, time: '14:02', title: '5구역 혼잡 (Lv.3)', details: '5구역에서 혼잡이 발생했습니다. 자세한 내용은 여기 있습니다.' },
  ];

  return (
    <Box sx={{ display: 'flex', gap: 2, height: '100%' }}>
      {/* 좌측 콘텐츠 영역 */}
      <Box sx={{ flex: 7, display: 'flex', flexDirection: 'column', gap: 2 }}>
        {/* 알림 선택에 따라 콘텐츠 렌더링 */}
        {selectedAlert ? renderAlertContent() : renderDefaultContent()}
      </Box>
      {/* 우측 알림 리스트 */}
      <Box sx={{ flex: 3 }}>
        <Paper sx={{ height: '100%', padding: 2, bgcolor: theme.palette.secondary.main, color: theme.palette.text.primary, borderRadius: 2 }}>
          <Box sx={{ bgcolor: theme.palette.primary.main, padding: 1, borderRadius: 1, textAlign: 'center', marginBottom: 2, height: '40px' }}>
            <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600, fontSize: '1rem' }}>
              위험 알림
            </Typography>
          </Box>
          {/* 알림 리스트 */}
          <List sx={{ height: 'calc(100% - 52px)', overflow: 'auto' }}>
            {alerts.map(alert => (
                <ListItem button onClick={() => handleAlertClick(alert)} key={alert.id} sx={{ bgcolor: '#2B3B5B', borderRadius: 1, marginBottom: 1, padding: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography variant="body2" sx={{ color: theme.palette.primary.main, marginBottom: 1 }}>
                    {alert.time}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <MailIcon sx={{ color: theme.palette.primary.main, marginRight: 1 }} />
                    <Typography variant="body2" sx={{ color: theme.palette.primary.main }}>
                    {alert.title}
                    </Typography>
                </Box>
                </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  );
}

export default Dashboard;
