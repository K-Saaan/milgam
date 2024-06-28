import {useEffect, useState} from "react";
import axios from "axios";
import { ThemeProvider } from '@mui/material/styles';
import Router from "./component/Main/Router.js";
import theme from './Theme';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router/>
        </ThemeProvider>
    );
}

export default App;