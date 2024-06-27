import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, IconButton, Box, Typography, CssBaseline, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
// 여기에 사용할 컴포넌트 추가
// 예시) import Header from "../Test_seungwon/Test_seungwon.js";
import Login from '../Login/Login.js';
import Signup from '../Signup/Signup.js';

/*
  * 1. MethodName: Background
  * 2. ClassName : Background
  * 3. Comment   : 메뉴(Drawer), 헤더, 컨테이너 레이아웃을 렌더링
  * 4. 작성자    : 김미진
  * 5. 작성일    : 2024. 06. 27
*/
function Background() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentComponent, setCurrentComponent] = useState('login'); // 상태를 통해 현재 렌더링할 컴포넌트를 관리

  const handleSignupClick = () => {
    setCurrentComponent('signup');
  };

  const handleLoginClick = () => {
    setCurrentComponent('login');
  };

  // Drawer 열고 닫는 함수
  const toggleDrawer = (open) => (event) => {
    // Tab이나 Shift 키 이벤트는 무시
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsOpen(open);
  };

  // Drawer의 리스트 아이템 정의
  const drawerList = () => (
    <Box
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {['대시보드', '영상 업로드'].map((text) => (
          <ListItem button key={text}
             sx={{ 
              '&:hover': {
              bgcolor: '#4880FF',
            }
          }}>
            <ListItemText 
              primary={text} 
              primaryTypographyProps={{
                sx: {
                  color: 'white',
                  paddingLeft: 3,
                  paddingTop: 1,
                  fontSize: '1.1rem', 
                  fontWeight: 600 
                }
              }} 
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{
      width: '100%',
      minHeight: '100vh', // 뷰포트의 최소 높이를 100%로 설정
      bgcolor: '#273142',
      color: 'white', 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      {/* 헤더 부분 */}
      <Box sx={{
        width: '100%',
        height: 70,
        bgcolor: '#313D4F', 
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start', 
        paddingLeft: 2, 
      }}>
        {/* 메뉴 아이콘 버튼 */}
        <IconButton onClick={toggleDrawer(true)} sx={{ color: 'white', marginRight: 2 }}>
          <MenuIcon />
        </IconButton>
        {/* 헤더 텍스트 */}
        <Typography variant="h5"
          sx={{ 
            fontWeight: 500 
          }}
        >
          MilGam
        </Typography>
      </Box>
      {/* Drawer 컴포넌트 */}
      <Drawer
        anchor='left'
        open={isOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            bgcolor: '#313D4F', 
            color: 'white', 
            width: '12%'
          }
        }}
      >
        {drawerList()}
      </Drawer>
      {/* 컨테이너 위에 텍스트 추가 */}
      <Typography variant="h6" 
        sx={{ 
          color: 'white', 
          marginTop: '35px', 
          alignSelf: 'flex-start', 
          marginLeft: '3%', 
          fontSize: '1.5rem', 
          fontWeight: 700 
        }}
      >
        {currentComponent === 'login' ? '로그인' : '회원가입'}
      </Typography>
      {/* SimpleContainer 컴포넌트 */}
      <React.Fragment>
        <CssBaseline />
        <Container maxWidth={false} sx={{ width: '95%', bgcolor: '#313D4F', borderRadius: '12px', padding: '16px', marginTop: '10px', marginBottom: '50px' }}>
          {currentComponent === 'login' ? (
            <Login onSignupClick={handleSignupClick} />
          ) : (
            <Signup onLoginClick={handleLoginClick} />
          )}
        </Container>
      </React.Fragment>
    </Box>
  );
}

export default Background;