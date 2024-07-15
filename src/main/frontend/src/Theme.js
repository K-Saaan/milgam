import { createTheme } from '@mui/material/styles';

/*
  * 1. MethodName: createTheme
  * 2. ClassName : createTheme
  * 3. Comment   : Theme 설정
  * 4. 작성자    : mijin
  * 5. 작성일    : 2024. 06. 28
*/
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#292929',
      paper: '#383838',
      item: '#FF90003D',
    },
    primary: {
      main: '#E8710A',
    },
    secondary: {
      main: '#403a34',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#aba19b',
    },
    divider: '#9797973D',
    cancel: "#848484",
    warn: "#FF4F4F",
    comp: "#00B69B",
    prog: "#F39C12",
    border: {
      primary: '#CFCFCF1D',
      secondary: "#FFFFFF1D",
    },
    crowd: {
      busy: '#EF3826', // 매우 혼잡
      slightlyBusy: '#FFA756', // 혼잡
      normal: '#E9C157', // 보통
      relaxed: '#00B69B', // 여유
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
      color: '#E8710A',
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
          backgroundColor: '#383838',
        },
      },
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#FFFFFF',
      paper: '#F7F7F7',
      item: '#E8710A1A',
    },
    primary: {
      main: '#F9AB00',
    },
    secondary: {
      main: '#f5efe9',
    },
    text: {
      primary: '#524e4a',
      secondary: '#59402a',
    },
    divider: '#9797973D',
    cancel: "#d6d6d6",
    warn: "#ff7878",
    comp: "#34e0c7",
    prog: "#f7b957",
    border: {
      primary: '#4d4d4d3D',
      secondary: "#524e4a1D",
    },
    crowd: {
      busy: '#EF3826', // 매우 혼잡
      slightlyBusy: '#FFA756', // 혼잡
      normal: '#E9C157', // 보통
      relaxed: '#00B69B', // 여유
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
      color: '#524e4a',
    },
    body1: {
      fontSize: '1rem',
      color: '#524e4a',
    },
    body2: {
      fontSize: '0.875rem',
      color: '#F9AB00',
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 600,
      color: '#F9AB00',
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
          backgroundColor: '#F5F5F5',
        },
      },
    },
  },
});

export { darkTheme, lightTheme };