import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import RightContentArea from '../components/Dashboard/RightContentArea';
import LeftContentArea from '../components/Dashboard/LeftContentArea'; 
import { Outlet } from 'react-router-dom';
import Typography from '@mui/material/Typography';

const Dashboard = () => {
  const theme = useTheme();
  const [selectedAlert, setSelectedAlert] = useState(null); // 선택된 알림을 관리하는 상태

  // 알림 항목 클릭 시 호출되는 함수
  const handleAlertClick = (alert) => {
    setSelectedAlert(alert);
  };

  // 알림 목록 -> 데이터 불러와서 받는걸로
  const alerts = [
    { id: 1, time: '12:53', title: '2구역 Lv.1 이상 행동 감지', details: '2구역에서 이상 행동이 감지되었습니다. 자세한 내용은 여기 있습니다.' },
    { id: 2, time: '14:02', title: '5구역 혼잡 (Lv.3)', details: '5구역에서 혼잡이 발생했습니다. 자세한 내용은 여기 있습니다.' },
  ];

  return (
    <>
      <div>
        <h1>Dashboard</h1>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '7fr 3fr', gap: '20px' }}>
        {/* 좌측 콘텐츠 영역 */}
        <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr', gap: '20px' }}>
          <Outlet />
        </div>
        {/* 우측 알림 리스트 */}
        <div style={{ display: 'grid', gap: '20px', minWidth: '300px' }}>
          <RightContentArea alerts={alerts} handleAlertClick={handleAlertClick} selectedAlert={selectedAlert} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
