import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import useStore from "../store";

// , display:'flex', alignContent:'center',justifyContent:'center'
const abStyle = (theme) => ({backgroundColor: theme.palette.background.paper});
const menuIconStyle = (theme) => ({ mr: 2, color: theme.palette.text.primary });
const titleStyle = { display: {  sm: 'block' } };
// xs: 'none',
const profileIconStyle = { display: { xs: 'none', md: 'flex' } };



function Topbar({ isAdmin, toggleTheme }) {
  const [open, setOpen] = React.useState(false); // 사이드바 상태 관리
  const navigate = useNavigate();
  const location = useLocation();

  const {isLogined} = useStore(state => state);

  // 테마 변경
  const theme = useTheme();
  const handleToggleClick = () => {
    const newPaletteType = theme.palette.mode === 'light' ? 'dark' : 'light';
    toggleTheme(newPaletteType);
  };

  const appBarStyle = abStyle(theme);

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

  // 홈 이동 핸들러
  const handleHomeClick = () => {
    navigate('/home', { state: { from: location.pathname } });
  };

  return (
    <Box>
      <AppBar position="static" style={appBarStyle}>
        <Toolbar sx={{display:'flex', justifyContent:'space-between', alignContent:'center' }}>
        <div style={{ display: 'flex' }}>
          {/* 사이드바 열기 버튼 */}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen} // 사이드바 열기 클릭 핸들러
              sx={menuIconStyle(theme)}
            >
              <MenuIcon />
            </IconButton>
            {/* 앱 타이틀 */}
              <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  sx={titleStyle}
              >
                <Link to="home" style={{textDecoration:'none'}}>
                  MilGam
                </Link>
              </Typography>
              <IconButton sx={{color: theme.palette.text.primary}} onClick={handleToggleClick}>
                {theme.palette.mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
              </IconButton>
            </div>
          {/* 데스크탑 화면에서 프로필 아이콘 */}
          { isLogined && (
            <Box sx={profileIconStyle}>
              <IconButton
                size="large"
                aria-label="go to profile page"
                aria-haspopup="true"
                color="inherit"
                onClick={handleProfileClick} // 클릭 시 /profile 경로로 이동
                sx={{color: theme.palette.text.primary}}
              >
                <AccountCircle />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      {/* 사이드바 컴포넌트 */}
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} isAdmin={isAdmin} />
    </Box>
  );
}

export default Topbar;
