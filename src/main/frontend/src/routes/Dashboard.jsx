import React, { useState, useEffect } from 'react';
import RightContentArea from '../components/Dashboard/RightContentArea';
import { Outlet, useLocation } from 'react-router-dom';
import DashBackground from "../components/DashBackground.js";
import MapCard from '../components/Dashboard/MapCard'; // MapCard import
import { createGlobalStyle } from 'styled-components';

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
};

const fullWidthStyle = {
  gridColumn: 'span 2',
  height: '500px', // 지도 높이 유지
};

const GlobalStyle = createGlobalStyle`
  body {
    overflow-x: hidden; /* 가로 스크롤 숨기기 */
  }
`;

/**
 * 1. ClassName: Dashboard
 * 2. FileName : Dashboard.js
 * 3. Package  : components.Dashboard
 * 4. Comment  : Dashboard 화면 
 * 5. 작성자   : mijin
 * 6. 작성일   : 2024. 07. 12
 **/

const Dashboard = () => {
  const [selectedAlert, setSelectedAlert] = useState(null); // 선택된 알림을 관리하는 상태
  const location = useLocation();
  const [alerts, setAlerts] = useState({});

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

  const isMapCardVisible = location.pathname === '/dashboard' || location.pathname === '/admin/dashboard';

  return (
    <>
      <GlobalStyle />
      <DashBackground name={"대시보드"}
        contents={
          <>
            <div style={containerStyle}>
              {/* 좌측 콘텐츠 영역 */}
              <div style={leftContentStyle}>
                <Outlet context={{ alerts, setAlerts }}/>
              </div>
              {/* 우측 알림 리스트 */}
              <div style={rightContentStyle}>
                <RightContentArea handleAlertClick={handleAlertClick} selectedAlert={selectedAlert} alerts={alerts} setAlerts={setAlerts} />
              </div>
              {/* 지도 카드 */}
              <div style={fullWidthStyle}>
                <div>
                  {isMapCardVisible && <MapCard />}
                </div>
              </div>
            </div>
          </>
        }
      />
    </>
  );
}

export default Dashboard;
