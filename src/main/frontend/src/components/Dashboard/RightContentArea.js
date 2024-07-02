import React from 'react';
import { Box, Paper, Typography, List, ListItem, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import MailIcon from '@mui/icons-material/Mail'; 
import { Link } from 'react-router-dom';

const RightContentArea = ({ alerts, handleAlertClick }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const onAlertClick = (alert) => {
    handleAlertClick(alert);
    navigate(`/dashboard/detail/${alert.id}`);
  };

  return (
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
            <ListItem
              key={alert.id}
              button
              key={alert.id}
              onClick={() => onAlertClick(alert)}
              sx={{
                bgcolor: '#2B3B5B',
                borderRadius: 1,
                marginBottom: 1,
                padding: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                textDecoration: 'none', // ListItem을 Link 컴포넌트로 만들 때 textDecoration을 none으로 설정
                color: 'inherit', // ListItem의 텍스트 색상을 상속받음
              }}
            >
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
  );
};

export default RightContentArea;
