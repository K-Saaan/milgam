import React, { useState } from 'react';
// import { ThemeProvider } from '@mui/material';
import { ThemeProvider, Global } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import { Outlet, useLocation } from "react-router-dom";
import Topbar from "./components/Topbar"
import AdminTopbar from './components/AdminTopbar.js';
import { darkTheme, lightTheme } from './Theme.js';
import { QueryClient, QueryClientProvider } from 'react-query';

const sectionStyle = {
  width: '100vw',
  minWidth: "1000px",
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
};

const contentBoxStyle = {
  flex: 1,
  display:'flex',
  justifyContent:'center',
  alignItems: 'flex-start'
};

const globalStyles = {
  body: {
    minWidth: '1920px', // 원하는 min-width 값으로 설정
    maxWidth: '1920px', // 원하는 max-width 값으로 설정
    margin: '0 auto', // 가운데 정렬을 원할 경우
  },
};

// Create a client
const queryClient = new QueryClient();

function App() {
  // 어드민 페이지일 때 사이드바를 변경하기 위한 코드
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  // 테마 변경
  const [currentTheme, setCurrentTheme] = useState(lightTheme);
  const toggleTheme = (themeType) => {
    setCurrentTheme(themeType === 'dark' ? darkTheme :  lightTheme) ;
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <Global styles={globalStyles} />
          {isAdmin ? (
            <AdminTopbar isAdmin={isAdmin} toggleTheme={toggleTheme} />
          ) : (
            <Topbar isAdmin={isAdmin} toggleTheme={toggleTheme} />
          )}
          <Outlet />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;