import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Backdrop from '@mui/material/Backdrop';
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
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { Link, useNavigate } from 'react-router-dom';
import Logout from "./Logout.js";
import useStore from "../store";

const drawerWidth = 240;

// DrawerHeader 컴포넌트 스타일 지정
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const drawerPaperStyle = {
  width: drawerWidth,
  boxSizing: 'border-box',
};

// Sidebar 컴포넌트 정의
const Sidebar = ({ open, handleDrawerClose, isAdmin }) => {
  const theme = useTheme();
  const [logoutModalOpen, setLogoutModalOpen] = React.useState(false);
  const navigate = useNavigate();

  const {isLogined, setIsLogined} = useStore(state => state);

  // 로그아웃 팝업 열기
  const handleLogoutClick = () => {
      setLogoutModalOpen(true);
      handleDrawerClose();
    };

  // 로그아웃 취소
  const handleLogoutClose = () => {
    setLogoutModalOpen(false);
  };
  
  // 로그아웃 처리
  const handleLogout = () => {
      setLogoutModalOpen(false);
      setIsLogined(false);
      localStorage.removeItem("key");
      navigate('/login');
  };

  // admin 메뉴
  const adminMenuItems = [
    { path: '/admin/approval', text: '회원가입 승인', icon: <PersonAddIcon /> },
    { path: '/admin/replyinquiry', text: '문의 답변', icon: <QuestionAnswerIcon /> },
  ];

  // user 하단 메뉴
  const userBottomMenuItems = isLogined? [
    { path: '/faq', text: 'FAQ', icon: <HelpCenterIcon /> },
    { path: '/inquiry', text: '문의 게시판', icon: <QuestionAnswerIcon /> },
    { path: '/logout', text: '로그아웃', icon: <LogoutIcon />, action: handleLogoutClick },
  ] : [
    { path: '/login', text: '로그인', icon: <LoginIcon /> },
    { path: '/signup', text: '회원가입', icon: <InboxIcon /> },
  ];

  // user 상단 메뉴
  const userTopMenuItems = [
    { path: '/dashboard', text: '대시보드', icon: <DashboardIcon /> },
    { path: '/uploadvideo', text: '영상 업로드', icon: <InboxIcon /> },
  ];

  const topMenuItems = isAdmin ? adminMenuItems : userTopMenuItems;

  return (
    <>
    <Backdrop open={open} onClick={handleDrawerClose} />
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': drawerPaperStyle,
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
      { isLogined && (
        <>
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
          <Divider />
        </>
      )}
      {!isAdmin && (
        <>
          <List sx={{ position: 'absolute', bottom: '0', width: '100%' }}>
            {userBottomMenuItems.map((item) => (
              <ListItem key={item.text} disablePadding style={{ marginTop: '8px' }}>
                <ListItemButton
                    //로그아웃 선택 시 Link 로 이동하는 대신 팝업을 띄우도록 조건 설정
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
    {/* 로그아웃 창 */}
    <Logout alertOpen={logoutModalOpen} handleClose={handleLogoutClose} handleLogout={handleLogout}/>
    </>
  );
};

export default Sidebar;