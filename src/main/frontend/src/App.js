import {useEffect, useState} from "react";
import axios from "axios";
import Main from "./component/Main/Main.js";
import Login from "./component/Login/Login.js";
import Signup from "./component/Signup/Signup.js";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import theme from './Theme';
import Dashboard from "./component/Dashboard/Dashboard.js";
import { ThemeProvider } from '@mui/material/styles';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Routes>
                    {/* 메인 페이지 */}
                    <Route path="/" element={<Main />} />
                    {/* 로그인 페이지 */}
                    <Route path="/login" element={<Login />} />
                    {/* 회원가입 페이지 */ }
                    <Route path="/signup" element={<Signup />} />
                    {/* 대시보드 페이지 */ }
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </BrowserRouter>   
        </ThemeProvider>
    );
}

export default App;