import React from 'react';
import { Box, Paper, Typography, List, ListItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import MailIcon from '@mui/icons-material/Mail'; 

const containerStyle = {
  flex: 3,
};

const paperStyle = (theme) => ({
  height: '100%',
  padding: 2,
  bgcolor: theme.palette.secondary.main,
  color: theme.palette.text.primary,
  borderRadius: 2,
});

const headerStyle = (theme) => ({
  bgcolor: theme.palette.primary.main,
  padding: 1,
  borderRadius: 1,
  textAlign: 'center',
  marginBottom: 2,
  height: '40px',
});

const listStyle = {
  height: 'calc(100% - 52px)',
  overflow: 'auto',
};

const listItemStyle = (theme, isSelected) => ({
  bgcolor: isSelected ? '#4a4a4a' : '#2B3B5B',
  borderRadius: 1,
  marginBottom: 1,
  padding: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  textDecoration: 'none',
  color: 'inherit',
});

const timeTextStyle = (theme) => ({
  color: theme.palette.primary.main,
  marginBottom: 1,
});

const titleBoxStyle = {
  display: 'flex',
  alignItems: 'center',
};

const titleTextStyle = (theme) => ({
  color: theme.palette.primary.main,
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
            <ListItem
              key={alert.id}
              button
              onClick={() => onAlertClick(alert)}
              sx={listItemStyle(theme, selectedAlert?.id === alert.id)}
            >
              <Typography variant="body2" sx={timeTextStyle(theme)}>
                {alert.time}
              </Typography>
              <Box sx={titleBoxStyle}>
                <MailIcon sx={{ color: theme.palette.primary.main, marginRight: 1 }} />
                <Typography variant="body2" sx={titleTextStyle(theme)}>
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
