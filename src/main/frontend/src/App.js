import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import { Outlet, useLocation } from "react-router-dom";
import Topbar from "./components/Topbar"
import Theme from './Theme.js';

// function App() {
//   return (
//     <ThemeProvider theme={Theme}>
//         <CssBaseline />
//         <Topbar />
//         <Outlet />
//     </ThemeProvider>
//   );
// }

function App() {
  // 어드민 페이지일 때 사이드바를 변경하기 위한 코드
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <ThemeProvider theme={Theme}>
        <CssBaseline />
        <Box
          component="section"
          sx={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div>
            <Topbar isAdmin={isAdmin} />
          </div>
          <Box
            sx={{
              flex: 1,
              overflow: 'auto',
            }}>
            <Outlet />
          </Box>
        </Box>
    </ThemeProvider>
  );
}

export default App;