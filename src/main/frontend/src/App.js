import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import { Outlet, useLocation } from "react-router-dom";
import Topbar from "./components/Topbar"
import { darkTheme, lightTheme } from './Theme.js';


const sectionStyle = {
  width: '100%',
  minWidth: "1000px",
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
};

const contentBoxStyle = {
  flex: 1,
};

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
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <Box component="section" sx={sectionStyle}>
        <div>
          <Topbar isAdmin={isAdmin} toggleTheme={toggleTheme}/>
        </div>
        <Box sx={contentBoxStyle}>
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;