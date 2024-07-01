import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Outlet } from "react-router-dom";
import Topbar from "./components/Topbar"
import Theme from './Theme.js';

function App() {
  return (
    <ThemeProvider theme={Theme}>
        <CssBaseline />
        <Topbar />
        <Outlet />
    </ThemeProvider>
  );
}

export default App;