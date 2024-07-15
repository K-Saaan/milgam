import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import { Outlet, useLocation } from "react-router-dom";
import Topbar from "./components/Topbar"
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

// Create a client
const queryClient = new QueryClient();

function App() {
  // 어드민 페이지일 때 사이드바를 변경하기 위한 코드
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  // 테마 변경
  const [currentTheme, setCurrentTheme] = useState(darkTheme);
  const toggleTheme = (themeType) => {
    setCurrentTheme(themeType === 'light' ? lightTheme : darkTheme);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={currentTheme}>
        <CssBaseline />
        <Box component="section" sx={sectionStyle}>
            <Topbar isAdmin={isAdmin} toggleTheme={toggleTheme}/>
          <Box sx={contentBoxStyle}>
            <Outlet />
          </Box>
        </Box>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;