import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useStore from "../store";
import { styled } from '@mui/system';
import Character from "../components/Home/new_cha.png"
import LoginAlert from './LoginAlert';
import ModeSwitch from './Styles/ModalSwitch';



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

function AdminTopbar({ isAdmin, toggleTheme }) {
  const navigate = useNavigate();
  const location = useLocation();
  const {adminLogined, setAdminLogined} = useStore(state => state);
  const [logoutModalOpen, setLogoutModalOpen] = React.useState(false);


  const handleModalClose = () => {
    setLogoutModalOpen(false);
  };

  const isloginCheck = (id) => {
    if (adminLogined){
      navigate(`/admin/${id}`, { state: { from: location.pathname } });
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
          <MenuBotton onClick={()=>isloginCheck('dashboard')} id='dashboard'>대시보드</MenuBotton>
          <MenuBotton onClick={()=>isloginCheck('approval')} id='approval'>가입 승인</MenuBotton>
          <MenuBotton onClick={()=>isloginCheck('replyinquiry')} id='replyinquiry'>문의 답변</MenuBotton>
        </div>
    
        
        <div style={{display:'flex', alignItems:'center'}}>
        {adminLogined ? (
        <MenuBotton onClick={() => setLogoutModalOpen(true)} id="logout">
            로그아웃
        </MenuBotton>
        ) : null}
          <ModeSwitch
          checked={theme.palette.mode === 'dark'}
          onChange={handleToggleClick}
          inputProps={{ 'aria-label': 'theme switch' }}
          />
        </div>
        </Toolbar>
      </AppBar>
      <LoginAlert alertOpen={logoutModalOpen} handleClose={handleModalClose} isAdmin={isAdmin}/>
    </Box>
  );
}

export default AdminTopbar;
