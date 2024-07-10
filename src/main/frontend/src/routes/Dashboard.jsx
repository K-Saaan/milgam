import React, { useState, useEffect } from 'react';
import RightContentArea from '../components/Dashboard/RightContentArea';
import { Outlet, useLocation } from 'react-router-dom';
import DashBackground from "../components/DashBackground.js";
import MapCard from '../components/Dashboard/MapCard'; // MapCard import

const containerStyle = {
  display: 'grid',
  gridTemplateColumns: '7fr 3fr',
  gap: '20px',
};

const leftContentStyle = {
  display: 'grid',
  gridTemplateRows: 'auto 1fr',
  gap: '20px',
};

const rightContentStyle = {
  display: 'grid',
  gap: '20px',
  minWidth: '300px',
};

const fullWidthStyle = {
  gridColumn: 'span 2',
};

const Dashboard = () => {
  const [selectedAlert, setSelectedAlert] = useState(null); // 선택된 알림을 관리하는 상태
  const location = useLocation();

  // 알림 항목 클릭 시 호출되는 함수
  const handleAlertClick = (alert) => {
    setSelectedAlert(alert);
  };

  // 경로가 변경될 때 selectedAlert 초기화
  useEffect(() => {
    if (location.pathname === '/dashboard') {
      setSelectedAlert(null);
    }
  }, [location.pathname]);

  // 알림 목록 -> 데이터 불러와서 받는걸로
  const alerts = [
    { id: 1, time: '12:53', title: '2구역 Lv.1 이상 행동 감지', details: '2구역에서 이상 행동이 감지되었습니다. 자세한 내용은 여기 있습니다.' },
    { id: 2, time: '14:02', title: '5구역 혼잡 (Lv.3)', details: '5구역에서 혼잡이 발생했습니다. 자세한 내용은 여기 있습니다.' },
  ];

  return (
    <DashBackground name={"대시보드"}
      contents={
        <>
          <div style={containerStyle}>
            {/* 좌측 콘텐츠 영역 */}
            <div style={leftContentStyle}>
              <Outlet />
            </div>
            {/* 우측 알림 리스트 */}
            <div style={rightContentStyle}>
              <RightContentArea alerts={alerts} handleAlertClick={handleAlertClick} selectedAlert={selectedAlert} />
            </div>
            {/* 지도 카드 */}
            <div style={fullWidthStyle}>
              <MapCard />
            </div>
          </div>
        </>
      }
    />
  );
}

export default Dashboard;
