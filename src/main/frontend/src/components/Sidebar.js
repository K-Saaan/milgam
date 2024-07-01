import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

// DrawerHeader 컴포넌트 스타일 지정
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

// Sidebar 컴포넌트 정의
const Sidebar = ({ open, handleDrawerClose }) => {
  const theme = useTheme();

  const menuItems = [
    { path: '/dashboard', text: 'Dashboard', icon: <InboxIcon /> },
    { path: '/uploadvideo', text: 'Upload Video', icon: <InboxIcon /> },
    { path: '/faq', text: 'FAQ', icon: <InboxIcon /> },
    { path: '/login', text: 'Log In', icon: <InboxIcon /> },
    { path: '/signup', text: 'Sign Up', icon: <InboxIcon />},
    // { path: '/1on1', text: '1:1 Inquiry', icon: <InboxIcon /> }, // 1:1 문의 영어로 변경
    // { path: '/logout', text: 'Log Out', icon: <InboxIcon /> }, // 로그아웃 영어로 변경
  ]

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      {/* Drawer 헤더 */}
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </DrawerHeader>

      {/* 메뉴 목록 */}
      <Divider />
      <List>
        {/* 대시보드와 영상업로드 메뉴 */}
        {menuItems.slice(0, 2).map((item, index) => (
          <ListItem key={item.text} disablePadding style={{ marginTop: '8px' }}>
            <ListItemButton component={Link} to={item.path} onClick={handleDrawerClose}>
              <ListItemIcon>
                {index % 2 === 0 ? <DashboardIcon /> : <InboxIcon />}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List sx={{ position: 'absolute', bottom: '0', width: '100%' }}>
        {/* FAQ, 1:1 문의, 로그아웃 메뉴 */}
        {menuItems.slice(2).map((item) => (
          <ListItem key={item.text} disablePadding style={{ marginTop: '8px' }}>
            <ListItemButton component={Link} to={item.path} onClick={handleDrawerClose}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} sx={{ marginLeft: '16px' }}/>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;