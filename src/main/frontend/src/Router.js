import React from "react";
import { createBrowserRouter } from "react-router-dom";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "adminlogin",
        element: <AdminLogIn />,
      },
      {
        path: "admin",
        element: <Admin />,
        children: [
          { path: "approval", element: <AdminApproval /> },
          { path: "replyinquiry", element: <AdminReply /> }
        ]
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          { path: "", element: <LeftContentArea /> },
          { path: "detail/:id", element: <LeftContentAreaDetail /> }
        ]
      },
      {
        path: "faq",
        element: <FaQ />,
      },
      {
        path: "login",
        element: <LogIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
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
        path: "home",
        element: <Home />,
      },
      {
        path: "inquiry",
        element: <Inquiry />,
      },
      {
        path: "resetpassword",
        element: <ResetPassword />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);


export default router;