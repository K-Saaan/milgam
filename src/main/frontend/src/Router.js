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
import Approval from "./components/Admin/Approval";
import ReplyInquiry from "./components/Admin/ReplyInquiry";
import AdminLogInForm from "./components/Admin/AdminLogInForm";
import ResetPassword from "./routes/ResetPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "adminlogin",
        element: <AdminLogInForm />,
      },
      {
        path: "admin",
        element: <Admin />,
        children: [
          { path: "approval", element: <Approval /> },
          { path: "replyinquiry", element: <ReplyInquiry /> }
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
    ],
  },
]);


export default router;