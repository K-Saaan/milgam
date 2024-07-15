// 로그인 여부에 따라 접근 가능한 페이지 제한하도록 라우터 구성
// 기존 라우터에 수정할 경우 login하지 않으면 경로로 이동할 수 없어 개발에 불편함이 있으므로 따로 저장해 둠

import { ProtectedRoute, AdminProtectedRoute } from './ProtectedRoute';

import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import Admin from "./routes/Admin";
import Dashboard from "./routes/Dashboard";
import FaQ from "./routes/FaQ";
import LogIn from "./routes/LogIn";
import Home from "./routes/Home";
import SignUp from "./routes/SignUp";
import UploadVideo from "./routes/UploadVideo";
import VideoResult from "./routes/VideoResult";
import LeftContentArea from "./components/Dashboard/LeftContentArea";
import LeftContentAreaDetail from "./components/Dashboard/LeftContentAreaDetail";
import Inquiry from "./routes/Inquiry";
import AdminLogIn from "./routes/AdminLogIn";
import ResetPassword from "./routes/ResetPassword";
import AdminApproval from "./routes/AdminApproval";
import AdminReply from './routes/AdminReply';
import Profile from './routes/Profile';


const prouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="home" replace />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "login/loginPage",
        element: <LogIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: '',
        element: <ProtectedRoute />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
            children: [
              { path: "", element: <LeftContentArea /> },
              { path: "detail/:id", element: <LeftContentAreaDetail /> }
            ]
          },
          {
            path: "uploadVideo",
            element: <UploadVideo />,
          },
          {
            path: "videoresult",
            element: <VideoResult />,
          },
          {
            path: "faq",
            element: <FaQ />,
          },
          {
            path: "inquiry",
            element: <Inquiry />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
      {
        path: "admin",
        element: <Admin />,
        children: [
          { path: "login", element: <AdminLogIn /> },
          { path: '',
            element: <AdminProtectedRoute />,
            children: [
              { path: "approval", element: <AdminApproval /> },
              { path: "replyinquiry", element: <AdminReply /> }
            ],
          },
        ],
      },
      { path: "*", element: <Navigate to="/home" replace /> }
    ],
  },
]);


export default prouter;

