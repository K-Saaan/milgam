import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import useStore from "../store";
import { styled } from '@mui/system';
import Character from "../components/Home/new_cha.png"
import LoginAlert from './LoginAlert';
import ModeSwitch from './Styles/ModalSwitch';
import Logout from './Logout';


// const barBoxStyle = { flexGrow: 1 };
const abStyle = (theme) => ({backgroundColor: theme.palette.background.paper});
const menuIconStyle = (theme) => ({ mr: 2, color: theme.palette.text.primary });
const titleStyle = { display: {  sm: 'block' } };
// xs: 'none',
const profileIconStyle = { display: { xs: 'none', md: 'flex' } };

const MenuBotton = styled('button')(({ theme }) =>({
  cursor: 'pointer',
  color: theme.palette.text.primary,
  background: 'none',
  border: 'none',
  textAlign: 'center',
  fontSize: '18px',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

function Topbar({ isAdmin, toggleTheme }) {
  const navigate = useNavigate();
  const location = useLocation();
  const {isLogined, setIsLogined} = useStore(state => state);
  const [logoutModalOpen, setLogoutModalOpen] = React.useState(false);
  const [loginAlertOpen, setLoginAlertOpen] = React.useState(false);

  const handleModalClose = () => {
    setLogoutModalOpen(false);
  };

  const handleLoginAlertClose  = () => {
    setLoginAlertOpen(false);
  };

  const isloginCheck = (id) => {
    if (isLogined || id === 'faq' || id === 'login/loginPage'){
      navigate(`/${id}`, { state: { from: location.pathname } });
    }
    else{
      setLoginAlertOpen(true);
    }
  }

  // 테마 변경
  const theme = useTheme();
  const handleToggleClick = () => {
    const newPaletteType = theme.palette.mode === 'light' ? 'dark' : 'light';
    toggleTheme(newPaletteType);
  };

  const appBarStyle = abStyle(theme);

  // 페이지 이동 핸들러
  const handleProfileClick = () => {
    navigate('/profile', { state: { from: location.pathname } });
  };

  // 홈 이동 핸들러
  const handleHomeClick = () => {
    navigate('/home', { state: { from: location.pathname } });
  };

  // 로그아웃 처리
  const handleLogout = () => {
    setLogoutModalOpen(false);
    setIsLogined(false);
    navigate('/home');
    localStorage.removeItem("key");
  };

  return (
    <Box>
      <AppBar position="static" style={appBarStyle}>
        <Toolbar sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div >
            {/* 앱 타이틀 */}
            <Link to="home" style={{display:'flex', alignItems:'center', textDecoration:'none'}}>
              <Typography
                variant="h6"
                noWrap
                sx={titleStyle}
              >
                MilGam
              </Typography>
              <img src={Character} style={{height:'50px', width:'50px', position: 'relative', top:'-6px', right:'7px'}} alt='giyomi' />
            </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', }}>
          <MenuBotton onClick={()=>isloginCheck('dashboard')} id='dashboard'>대시보드</MenuBotton>
          <MenuBotton onClick={()=>isloginCheck('uploadvideo')} id='uploadvideo'>영상업로드</MenuBotton>
          <MenuBotton onClick={()=>isloginCheck('inquiry')} id='inquiry'>1:1문의</MenuBotton>
          <MenuBotton onClick={()=>isloginCheck('faq')} id='faq'>FAQ</MenuBotton>
        </div>

        <div style={{display:'flex', alignItems:'center'}}>
          {!isLogined ? (
          <MenuBotton onClick={() => isloginCheck('login/loginPage')} id="login/loginPage">
            로그인
          </MenuBotton>
          ) : (
          <MenuBotton onClick={() => setLogoutModalOpen(true)} id="logout">
            로그아웃
          </MenuBotton>
          )}

          <ModeSwitch
          checked={theme.palette.mode === 'dark'}
          onChange={handleToggleClick}
          inputProps={{ 'aria-label': 'theme switch' }}
          />

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
                      <AccountCircle sx={{ fontSize: 40 }} />
                    </IconButton>
              </Box>
          )}
        </div>
        </Toolbar>
      </AppBar>
      <LoginAlert alertOpen={loginAlertOpen} handleClose={handleLoginAlertClose} isAdmin={isAdmin}/>
      <Logout alertOpen={logoutModalOpen} handleClose={handleModalClose} handleLogout={handleLogout}/>
    </Box>
  );
}

export default Topbar;
