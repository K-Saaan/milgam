import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, List } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import MailIcon from '@mui/icons-material/Mail'; 
import CustomListItem from '../Styles/CustomListItem';
import AlertManager from './AlertManager';

// 컨테이너의 flex 속성을 설정하여 레이아웃을 조정
const containerStyle = {
  flex: 3,
  height: '520px',
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
  marginBottom: 2,
  height: '40px', 
});

// 알림 리스트의 스타일
const listStyle = {
  height: 'calc(100% - 100px)',
  overflow: 'auto',
};

// 시간 텍스트의 스타일
const timeTextStyle = (theme, selected) => ({
  color: selected ? theme.palette.text.primary : theme.palette.primary.main,
  marginBottom: 1,
});

// 제목 박스 스타일
const titleBoxStyle = {
  display: 'flex',
  alignItems: 'center',
};

// 제목 텍스트 스타일
const titleTextStyle = (theme, selected) => ({
  color: selected ? theme.palette.text.primary : theme.palette.primary.main,
});

const RightContentArea = ({ handleAlertClick, selectedAlert }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);

  const onAlertClick = (alert) => {
    handleAlertClick(alert);
    navigate(`/dashboard/detail/${alert.id}`);
  };

  return (
    <Box sx={containerStyle}>
      <AlertManager setAlerts={setAlerts} />
      <Paper sx={paperStyle(theme)}>
        <Box sx={headerStyle(theme)}>
          <Typography variant="subtitle1" sx={{ color: theme.palette.text.primary, fontWeight: 600, fontSize: '1rem' }}>
            위험 알림
          </Typography>
        </Box>
        <List sx={listStyle}>
          {Object.keys(alerts).map((key, index) => (
            
            <CustomListItem
              key={index}
              button
              onClick={() => onAlertClick(alerts[key])}
              selected={selectedAlert?.id === alerts[key].id}
            >
              <Typography variant="body2" sx={timeTextStyle(theme, selectedAlert?.id === alerts[key].id)}>
                {alerts[key][alerts[key].length-1].date}
              </Typography>
              <Box sx={titleBoxStyle}>
                <MailIcon sx={{ color: selectedAlert?.id === alerts[key].id ? theme.palette.text.primary : theme.palette.primary.main, marginRight: 1 }} />
                <Typography variant="body2" sx={titleTextStyle(theme, selectedAlert?.id === alerts[key].id)}>
                  {alerts[key][alerts[key].length-1].context}
                </Typography>
              </Box>
            </CustomListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default RightContentArea;