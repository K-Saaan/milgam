import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, List, Badge, Skeleton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import MailIcon from '@mui/icons-material/Mail'; 
import CustomListItem from '../Styles/CustomListItem';
import {AlertManager,SseComponent} from './AlertManager';
import axios from 'axios';
import axiosRetry from 'axios-retry';
import { getAllMessages } from '../../api/api';

axiosRetry(axios, {
  retries: 5,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    // 재시도할 조건을 명시합니다. 기본적으로 idempotent 요청에 대해서만 재시도합니다.
    // 500 오류를 포함한 모든 오류에 대해 재시도하도록 합니다.
    return error.response.status >= 500 || axiosRetry.isNetworkError(error);
  },
});

// 컨테이너의 flex 속성을 설정하여 레이아웃을 조정
const containerStyle = {
  flex: 3,
  height: '515px',
};

// Paper 스타일
const paperStyle = (theme) => ({
  height: '100%',
  padding: 2,
  bgcolor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderRadius: 2,
});

// 위험 알림 헤더 스타일
const headerStyle = (theme) => ({
  bgcolor: theme.palette.primary.main,
  padding: 1,
  borderRadius: 1,
  textAlign: 'center',
  height: '40px', 
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

// 알림 리스트의 스타일
const listStyle = {
  height: 'calc(100% - 100px)',
  overflow: 'hidden',
  height: '110px'
};

// 시간 텍스트의 스타일
const timeTextStyle = (theme, selected) => ({
  color: selected ? theme.palette.text.primary : theme.palette.primary.main,
  marginBottom: 1,
});

// 제목 박스 스타일
const titleBoxStyle = {
  display: 'flex',
  alignItems: 'space-between',
  justifyContent: 'space-between',
};

// 제목 텍스트 스타일
const titleTextStyle = (theme, selected) => ({
  color: selected ? theme.palette.text.primary : theme.palette.primary.main,
});

const badgeStyle = {
  '& .MuiBadge-badge': {
    border: 'none', 
    padding: '0 4px',
    backgroundColor: 'red',
    color: 'white',
    marginRight: '12px',
  },
};

// 날짜 형식을 yyyy-mm-dd hh:mm로 변환하는 함수
const formatDate = (dateString) => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const RightContentArea = ({ handleAlertClick, selectedAlert, alerts, setAlerts }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = location.pathname.startsWith('/admin');
  const [loading, setLoading] = useState(true);
  const [unreadCounts, setUnreadCounts] = useState({});

  // // getAllMessages로 unreadcount 계산
  // useEffect(() => {
  //   const fetchMessages = async () => {
  //     try {
  //       const { data: messages } = await getAllMessages();
  //       const unreadCounts = {};
        
  //       messages.forEach(message => {
  //         const key = message.alertKey;
  //         if (!message.confirm) {
  //           if (!unreadCounts[key]) {
  //             unreadCounts[key] = 0;
  //           }
  //           unreadCounts[key] += 1;
  //         }
  //       });
  
  //       setAlerts(messages.reduce((acc, message) => {
  //         const key = message.alertKey;
  //         if (!acc[key]) acc[key] = [];
  //         acc[key].push(message);
  //         return acc;
  //       }, {}));
  
  //       setUnreadCounts(unreadCounts);
  //       setLoading(false);
  //       // console.log(messages);
  //     } catch (error) {
  //       console.error('Error fetching messages:', error);
  //     }
  //   };
  
  //   fetchMessages();
  // }, [setAlerts]);

  // 알림을 클릭하면 읽었다는 patch 요청보내기
  const onAlertClick = async (alertKey, alert, isAdmin) => {
    const updatedAlerts = { ...alerts };
    updatedAlerts[alertKey] = updatedAlerts[alertKey].map(alert => ({ ...alert, read: true }));
    
    setAlerts(updatedAlerts); // 상태 업데이트
  
    // try {
    //   const alertToUpdate = updatedAlerts[alertKey].find(alertItem => alertItem.logIndex === alert[0].logIndex);
    //   console.log('alertToUpdate.logIndex,', alertToUpdate.logIndex);
  
    //   // 각 메시지에 대해 PATCH 요청 보내기
    //   const updatePromises = updatedAlerts[alertKey].map(async alertItem => {
    //     try {
    //       await axios.patch('/dashboards/update', {
    //         logIndex: alertItem.logIndex,
    //       }, {
    //         withCredentials: true,
    //         headers: {
    //           'Content-Type': 'application/json'
    //         }
    //       });
    //       console.log("Patch 요청 성공:", alertItem.logIndex);
    //     } catch (error) {
    //       console.error('Patch 요청 실패:', alertItem.logIndex, error);
    //     }
    //   });
  
    //   // 모든 PATCH 요청이 완료될 때까지 기다림
    //   await Promise.all(updatePromises);
  
    //   console.log('모든 PATCH 요청 성공:', alertKey);
    // } catch (error) {
    //   console.error('fetch 요청 실패:', error);
    // }
  
    handleAlertClick(alert);
  
    // 여기서 바로 네비게이션
    const targetPath = isAdmin 
      ? `/admin/dashboard/detail/${alertKey}` 
      : `/dashboard/detail/${alertKey}`;
    
    navigate(targetPath, { state: { alert: updatedAlerts[alertKey] } });
  };


  return (
    <Box sx={containerStyle}>
      <AlertManager setAlerts={setAlerts} setLoading={setLoading}/>
      <SseComponent setAlerts={setAlerts} />
      <Paper sx={paperStyle(theme)}>
        <Box sx={headerStyle(theme)}>
          <Typography variant="subtitle1" sx={{ color: theme.palette.text.primary, fontWeight: 600, fontSize: '1rem' }}>
            위험 알림
          </Typography>
        </Box>
        {loading ? (
        <Box sx={{ padding: 2 }}>
          <Skeleton variant="rectangular" height={40} sx={{ marginBottom: 2 }} />
          <Skeleton variant="rectangular" height={40} sx={{ marginBottom: 2 }} />
          <Skeleton variant="rectangular" height={40} sx={{ marginBottom: 2 }} />
        </Box>
      ) : (
        <List sx={listStyle}>
        {alerts && Object.keys(alerts).length > 0 ? (
          Object.keys(alerts).map((key, index) => {
            const unreadCount = unreadCounts[key] || 0;
            const alertList = alerts[key] || [];
            const isSelected = selectedAlert?.id === alertList?.[0]?.id;
            return (
              <CustomListItem
                key={index}
                button
                onClick={() => onAlertClick(key, alertList, isAdmin)}
                selected={isSelected}
              >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <Typography variant="body2" sx={timeTextStyle(theme, isSelected)}>
            {formatDate(alertList[0]?.date)}
          </Typography>
          <Badge badgeContent={unreadCount} sx={badgeStyle}></Badge>
        </Box>
        <Box sx={titleBoxStyle}>
          <MailIcon sx={{ color: isSelected ? theme.palette.text.primary : theme.palette.primary.main, marginRight: 1 }} />
          <Typography variant="body2" sx={titleTextStyle(theme, isSelected)}>
            {alertList[0]?.context.split('\n').map((line, index) => (
               <React.Fragment key={index}>
                              {line}
                              <br />
              </React.Fragment>))}
          </Typography>
        </Box>
      </CustomListItem>
        );
          })
        ) : (
          <Typography variant="body2" align="center" sx={{ marginTop: '16px' }}>
            No alerts available
          </Typography>
        )}
          </List>
        )}
      </Paper>
    </Box>
  );
};

export default RightContentArea;
