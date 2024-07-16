import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useStore from "../store";
import { styled } from '@mui/system';
import Character from "../components/Home/new_cha.png"
import LoginAlert from './LoginAlert';
import ModeSwitch from './Styles/ModalSwitch';
import Logout from "./Logout";

const abStyle = (theme) => ({backgroundColor: theme.palette.background.paper});
const titleStyle = { display: {  sm: 'block' } };

const MenuButton = styled('button')(({ theme, isActive }) => ({
  cursor: 'pointer',
  color: isActive ? theme.palette.primary.main : theme.palette.text.primary,
  background: 'none',
  border: 'none',
  textAlign: 'center',
  fontSize: '18px',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

function AdminTopbar({ isAdmin, toggleTheme }) {
  const navigate = useNavigate();
  const location = useLocation();
  const {adminLogined, setAdminLogined} = useStore(state => state);
  const [logoutModalOpen, setLogoutModalOpen] = React.useState(false);
  const [loginAlertOpen, setLoginAlertOpen] = React.useState(false);

  const handleModalClose = () => {
    setLogoutModalOpen(false);
    setLoginAlertOpen(false);
  };

  const isloginCheck = (id) => {
    if (adminLogined){
      navigate(`/admin/${id}`, { state: { from: location.pathname } });
    }
    else{
      setLoginAlertOpen(true);
    }
  }

  // 로그아웃 처리
  const handleLogout = () => {
    setLogoutModalOpen(false);
    setAdminLogined(false);
    navigate('/home');
    localStorage.removeItem("key");
  };

  // 테마 변경
  const theme = useTheme();
  const handleToggleClick = () => {
    const newPaletteType = theme.palette.mode === 'light' ? 'dark' : 'light';
    toggleTheme(newPaletteType);
  };

  const appBarStyle = abStyle(theme);

  // 현재 경로와 버튼 ID 비교하여 활성 상태 확인
  const isActive = (id) => location.pathname.includes(id);

  return (
    <Box>
      <AppBar position="static" style={appBarStyle}>
        <Toolbar sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div >
            {/* 앱 타이틀 */}
            <Link to="admin/login" style={{display:'flex', alignItems:'center', textDecoration:'none'}}>
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', }}>
          <MenuButton onClick={()=>isloginCheck('dashboard')} id='dashboard' isActive={isActive('dashboard')}>대시보드</MenuButton>
          <MenuButton onClick={()=>isloginCheck('approval')} id='approval' isActive={isActive('approval')}>가입 승인</MenuButton>
          <MenuButton onClick={()=>isloginCheck('replyinquiry')} id='replyinquiry' isActive={isActive('replyinquiry')}>문의 답변</MenuButton>
        </div>
    
        
        <div style={{display:'flex', alignItems:'center'}}>
        {adminLogined ? (
        <MenuButton onClick={() => setLogoutModalOpen(true)} id="logout">
            로그아웃
        </MenuButton>
        ) : null}
          <ModeSwitch
          checked={theme.palette.mode === 'dark'}
          onChange={handleToggleClick}
          inputProps={{ 'aria-label': 'theme switch' }}
          />
        </div>
        </Toolbar>
      </AppBar>
      <LoginAlert alertOpen={loginAlertOpen} handleClose={handleModalClose} isAdmin={isAdmin}/>
      <Logout alertOpen={logoutModalOpen} handleClose={handleModalClose} handleLogout={handleLogout}/>
    </Box>
  );
}

export default AdminTopbar;
