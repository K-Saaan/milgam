import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Sidebar from './Sidebar';
import { useTheme } from '@mui/material/styles';

const barBoxStyle = { flexGrow: 1 };
const abStyle = (theme) => ({backgroundColor: theme.palette.background.paper});
const menuIconStyle = { mr: 2 };
const titleStyle = { display: { xs: 'none', sm: 'block' } };
const profileIconStyle = { display: { xs: 'none', md: 'flex' } };

function Topbar({ isAdmin }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false); // 사이드바 상태 관리

  const theme = useTheme();
  const appBarStyle = abStyle(theme);

  const isMenuOpen = Boolean(anchorEl);

  // 프로필 메뉴 열기 핸들러
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // 메뉴 닫기 핸들러
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // 사이드바 열기 핸들러
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // 사이드바 닫기 핸들러
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuId = 'primary-search-account-menu';
  // 프로필 메뉴 렌더링
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right',}}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right',}}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  return (
    <Box sx={barBoxStyle}>
      <AppBar position="static" style={appBarStyle}>
        <Toolbar>
          {/* 사이드바 열기 버튼 */}
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen} // 사이드바 열기 클릭 핸들러
            sx={menuIconStyle}
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
            MilGam
          </Typography>
          <Box sx={barBoxStyle} />
          {/* 데스크탑 화면에서 프로필 아이콘 */}
          <Box sx={profileIconStyle}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {/* 프로필 메뉴 렌더링 */}
      {renderMenu}
      {/* 사이드바 컴포넌트 */}
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} isAdmin={isAdmin} />
    </Box>
  );
}

export default Topbar;