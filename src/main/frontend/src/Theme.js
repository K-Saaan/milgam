import { createTheme } from '@mui/material/styles';

/*
  * 1. MethodName: createTheme
  * 2. ClassName : createTheme
  * 3. Comment   : Theme 설정
  * 4. 작성자    : mijin
  * 5. 작성일    : 2024. 06. 28
*/
const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1B2431',
      paper: '#273142',
    },
    primary: {
      main: '#4880FF',
    },
    secondary: {
      main: '#313D4F',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#CBD5E0',
    },
  },

  typography: {
    fontFamily: '"Nunito Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#FFFFFF',
    },
    body1: {
      fontSize: '1rem',
      color: '#FFFFFF',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#4880FF',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 600,
      color: '#FFFFFF', // 흰색
    },
  },

  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          width: '95%',
          borderRadius: '12px',
          padding: 0,
          marginTop: '10px',
          marginBottom: '50px',
          backgroundColor: '#273142', 
        },
      },
    },
  },
});

export default theme;