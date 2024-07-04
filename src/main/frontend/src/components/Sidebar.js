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
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Link, useNavigate } from 'react-router-dom';
import Logout from "./Logout.js";

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
const Sidebar = ({ open, handleDrawerClose, isAdmin }) => {
  const theme = useTheme();
  const [logoutModalOpen, setLogoutModalOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleLogoutClick = () => {
      setLogoutModalOpen(true);
    };
  const handleLogoutClose = () => {
    setLogoutModalOpen(false);
  };
  const handleLogout = () => {
      setLogoutModalOpen(false);
      navigate('/login');
  };

  // admin 메뉴
  const adminMenuItems = [
    { path: '/admin/approval', text: '회원가입 승인', icon: <PersonAddIcon /> },
    { path: '/admin/replyinquiry', text: '문의 답변', icon: <QuestionAnswerIcon /> },
  ];

  // user 하단 메뉴
  const userBottomMenuItems = [
    { path: '/faq', text: 'FAQ', icon: <InboxIcon /> },
    { path: '/login', text: '로그인', icon: <InboxIcon /> },
    { path: '/inquiry', text: '문의 게시판', icon: <InboxIcon /> }, 
    { path: '/logout', text: '로그아웃', icon: <InboxIcon />, action: handleLogoutClick },
  ]
  ];

  // user 상단 메뉴
  const userTopMenuItems = [
    { path: '/dashboard', text: '대시보드', icon: <DashboardIcon /> },
    { path: '/uploadvideo', text: '영상 업로드', icon: <InboxIcon /> },
  ];

  const topMenuItems = isAdmin ? adminMenuItems : userTopMenuItems;

  return (
    <>
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
        {topMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding >
            <ListItemButton component={Link} to={item.path} onClick={handleDrawerClose}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {!isAdmin && (
        <>
          <Divider />
          <List sx={{ position: 'absolute', bottom: '0', width: '100%' }}>
            {userBottomMenuItems.map((item) => (
              <ListItem key={item.text} disablePadding style={{ marginTop: '8px' }}>
                <ListItemButton
                    component={item.path !== '/logout' ? Link : 'button'}
                    to={item.path !== '/logout' ? item.path : undefined}
                    onClick={item.action || handleDrawerClose}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={{ marginLeft: '16px' }}/>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Drawer>

    <Logout alertOpen={logoutModalOpen} handleClose={handleLogoutClose} handleLogout={handleLogout}/>
    </>
  );
};

export default Sidebar;