import React from 'react';
import { Box, Paper, Typography, List } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import MailIcon from '@mui/icons-material/Mail'; 
import CustomListItem from '../Styles/CustomListItem';

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
  color: selected ? 'white' : theme.palette.primary.main,
  marginBottom: 1,
});

// 제목 박스 스타일
const titleBoxStyle = {
  display: 'flex',
  alignItems: 'center',
};

// 제목 텍스트 스타일
const titleTextStyle = (theme, selected) => ({
  color: selected ? 'white' : theme.palette.primary.main,
});

const RightContentArea = ({ alerts, handleAlertClick, selectedAlert }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const onAlertClick = (alert) => {
    handleAlertClick(alert);
    navigate(`/dashboard/detail/${alert.id}`);
  };

  return (
    <Box sx={containerStyle}>
      <Paper sx={paperStyle(theme)}>
        <Box sx={headerStyle(theme)}>
          <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600, fontSize: '1rem' }}>
            위험 알림
          </Typography>
        </Box>
        <List sx={listStyle}>
          {alerts.map(alert => (
            <CustomListItem
              key={alert.id}
              button
              onClick={() => onAlertClick(alert)}
              selected={selectedAlert?.id === alert.id}
            >
              <Typography variant="body2" sx={timeTextStyle(theme, selectedAlert?.id === alert.id)}>
                {alert.time}
              </Typography>
              <Box sx={titleBoxStyle}>
                <MailIcon sx={{ color: selectedAlert?.id === alert.id ? 'white' : theme.palette.primary.main, marginRight: 1 }} />
                <Typography variant="body2" sx={titleTextStyle(theme, selectedAlert?.id === alert.id)}>
                  {alert.title}
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
