import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

function Topbar({ isAdmin }) {
  const [open, setOpen] = React.useState(false); // 사이드바 상태 관리
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    // 컴포넌트가 마운트될 때 사이드바를 닫기 상태로 초기화
    setOpen(false);
  }, []);

  // 사이드바 열기 핸들러
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // 사이드바 닫기 핸들러
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // 페이지 이동 핸들러
  const handleProfileClick = () => {
    navigate('/profile', { state: { from: location.pathname } });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* 사이드바 열기 버튼 */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen} // 사이드바 열기 클릭 핸들러
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          {/* 앱 타이틀 */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            MilGam
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {/* 데스크탑 화면에서 프로필 아이콘 */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="go to profile page"
              aria-haspopup="true"
              color="inherit"
              onClick={handleProfileClick} // 클릭 시 /profile 경로로 이동
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {/* 사이드바 컴포넌트 */}
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} isAdmin={isAdmin} />
    </Box>
  );
}

export default Topbar;
