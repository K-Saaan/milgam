import React, { useEffect, useState, useRef } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import { Outlet } from "react-router-dom";
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
            <Topbar />
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