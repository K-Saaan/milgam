import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useStore from "../store";
import { styled } from '@mui/system';
import Character from "../components/Home/new_cha.png"
import LoginAlert from './LoginAlert';
import ModeSwitch from './Styles/ModalSwitch';
import Logout from './Logout';
import axios from 'axios';

/**
 * 1. FileName : Topbar.js
 * 3. Package  : components.Topbar
 * 4. Comment  : 네비게이션 바
 * 5. 작성자   : bonjae
 * 6. 작성일   : 2024. 07. 01
 **/


const abStyle = (theme) => ({backgroundColor: theme.palette.background.paper});
const titleStyle = { display: {  sm: 'block' } };
const profileIconStyle = { display: { xs: 'none', md: 'flex' } };

const MenuButton = styled('button')(({ theme, isActive }) => ({
  cursor: 'pointer',
  color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
  background: 'none',
  border: 'none',
  textAlign: 'center',
  fontSize: '18px',
  fontWeight: 540,
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

/**
 * 1. ClassName: Topbar
 * 2. FileName : Topbar.js
 * 3. Package  : components.Topbar
 * 4. Comment  : 탑바 컴포넌트
 * 5. 작성자   : mijin
 * 6. 작성일   : 2024. 07. 03
 **/
function Topbar({ isAdmin, toggleTheme }) {
  const navigate = useNavigate();
  const location = useLocation();
  const wapiKey = process.env.REACT_APP_W_API_KEY;

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

  /**
   * 1. MethodName: handleToggleClick
   * 2. ClassName : Topbar
   * 3. Comment   : 라이트/다크 테마 변경
   * 4. 작성자    : boreum
   * 5. 작성일    : 2024. 07. 06
   **/
  const theme = useTheme();
  const handleToggleClick = () => {
    const newPaletteType = theme.palette.mode === 'light' ? 'dark' : 'light';
    toggleTheme(newPaletteType);
  };

  const containerStyle = {
    background: theme.palette.mode === 'dark' 
      ? 'rgb(201,234,255) radial-gradient(circle, rgba(201,234,255,1) 17%, rgba(191,246,255,1) 57%, rgba(56, 56, 56, 1) 95%)' 
      : 'rgb(201,234,255) radial-gradient(circle, rgba(201,234,255,1) 17%, rgba(191,246,255,1) 57%, rgba(255,255,255,1) 95%)',
    marginRight: '8px',
    height: '64px',
    width: ' 120px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '16px', // 둥근 모서리
  };

  const appBarStyle = abStyle(theme);

  // 페이지 이동 핸들러
  const handleProfileClick = () => {
    navigate('/profile', { state: { from: location.pathname } });
  };

  // 로그아웃 처리
  const handleLogout = () => {
    setLogoutModalOpen(false);
    setIsLogined(false);
    navigate('/home');
    localStorage.removeItem("key");
  };

  // 현재 경로와 버튼 ID 비교하여 활성 상태 확인
  const isActive = (id) => location.pathname.includes(id);
  
  const [temp, setTemp]= React.useState()
  const [code, setCode]= React.useState()
  
  const getWeather = async () => {
    try {
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=seoul&appid=${wapiKey}&units=metric`);
        setTemp(res.data.main.temp);
        setCode(res.data.weather[0].icon)
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
  };

  React.useEffect(() => {
      getWeather();
  }, []);

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
        <div style={{marginLeft:'140px',display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', }}>
          <MenuButton onClick={()=>isloginCheck('dashboard')} id='dashboard' isActive={isActive('dashboard')}>대시보드</MenuButton>
          <MenuButton onClick={()=>isloginCheck('uploadvideo')} id='uploadvideo' isActive={isActive('uploadvideo')}>영상업로드</MenuButton>
          <MenuButton onClick={()=>isloginCheck('inquiry')} id='inquiry' isActive={isActive('inquiry')}>1:1문의</MenuButton>
          <MenuButton onClick={()=>isloginCheck('faq')} id='faq' isActive={isActive('faq')}>FAQ</MenuButton>
        </div>

        <div style={{display:'flex', alignItems:'center'}}>
          {!isLogined ? (
          <MenuButton onClick={() => isloginCheck('login/loginPage')} id="login/loginPage">
            로그인
          </MenuButton>
          ) : (
          <MenuButton onClick={() => setLogoutModalOpen(true)} id="logout">
            로그아웃
          </MenuButton>
          )}

        <div>
          {temp === null ? 
            <div>데이터를 로딩 중...</div> :
            <div style={containerStyle}>
              <img 
                style={{ width: '50px', height: '50px', marginRight: '-8px' }} 
                src={`http://openweathermap.org/img/wn/${code}.png`} 
                alt='weather' 
              />
              <span style={{ textAlign: 'center', fontSize: '14px', width: '50px', height: 'auto', color: '#524e4a' }}>
                {temp} 
                <span style={{ position: 'relative', top: '-4px', right: '-2px', fontWeight: 800 }}>
                  &deg;C
                </span>
              </span>
            </div>
            
          }
        </div>


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
