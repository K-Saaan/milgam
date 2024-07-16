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
import Character from "../components/Home/new_cha.png"
import LoginAlert from './LoginAlert';
import ModeSwitch from './Styles/ModalSwitch';
import axios from 'axios';

// const barBoxStyle = { flexGrow: 1 };
const abStyle = (theme) => ({backgroundColor: theme.palette.background.paper});
const titleStyle = { display: {  sm: 'block' } };
// xs: 'none',
const profileIconStyle = { display: { xs: 'none', md: 'flex' } };

function Topbar({ isAdmin, toggleTheme }) {

  const navigate = useNavigate();
  const location = useLocation();
  const wapiKey = process.env.REACT_APP_W_API_KEY;

  const {isLogined, setIsLogined} = useStore(state => state);
  // const {adminLogined, setAdminLogined} = useStore(state => state);
  const [logoutModalOpen, setLogoutModalOpen] = React.useState(false);

  const handleModalClose = () => {
    setLogoutModalOpen(false);
  };

  const isloginCheck = (id) => {
    if (isLogined || id === 'faq'){
      navigate(`/${id}`, { state: { from: location.pathname } });
    }
    else{
      setLogoutModalOpen(true);
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

  const [temp, setTemp]= React.useState()
  const [code, setCode]= React.useState()

  const getWeather = async () => {
    try {
        const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${wapiKey}&units=metric`);
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', }}>
          <button onClick={()=>isloginCheck('dashboard')} style={{cursor: 'pointer', color: theme.palette.text.primary, background: 'none', border: 'none', textAlign: 'center', fontSize: '18px' }}>대시보드</button>
          <button onClick={()=>isloginCheck('uploadvideo')} id='uploadvideo' style={{cursor: 'pointer', color: theme.palette.text.primary, background: 'none', border: 'none', textAlign: 'center', fontSize: '18px' }}>영상업로드</button>
          <button onClick={()=>isloginCheck('inquiry')} id='inquiry' style={{cursor: 'pointer', color: theme.palette.text.primary, background: 'none', border: 'none', textAlign: 'center', fontSize: '18px' }}>1:1문의</button>
          <button onClick={()=>isloginCheck('faq')} id='faq' style={{cursor: 'pointer', color: theme.palette.text.primary, background: 'none', border: 'none', textAlign: 'center', fontSize: '18px' }}>FAQ</button>
        </div>

      
        
          <div style={{display:'flex', alignItems:'center'}}>

            <div>
              {temp === null ? 
                <div>데이터를 로딩 중...</div> :
                <div style={{marginRight:'8px', height: '64px', display:'flex', justifyContent:'center', alignItems:'center'}}>
                  <img style={{width: '50px', height: '50px', marginRight:'-8px'}} src={`http://openweathermap.org/img/wn/${code}.png`} alt='weather' />
                  <span style={{textAlign:'center' ,fontSize:'14px', width: '50px', height: 'auto'}}>
                    {temp} 
                    <span style={{ position: 'relative', top:'-4px', right:'-2px', fontWeight: 800 }}>
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
            { isLogined || (
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
          </div>
        </Toolbar>
      </AppBar>
      <LoginAlert alertOpen={logoutModalOpen} handleClose={handleModalClose} />
    </Box>
  );
}

export default Topbar;
