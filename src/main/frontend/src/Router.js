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
import DirectorSignUp from "./components/SignUp/DirectorSignUp"
import HostSignUp from "./components/SignUp/HostSignUp";
import LeftContentArea from "./components/Dashboard/LeftContentArea";
import LeftContentAreaDetail from "./components/Dashboard/LeftContentAreaDetail";
import Inquiry from "./routes/Inquiry";

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
        path: "admin",
        element: <Admin />,
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
        // children: [
        //   { path: "directorsignup",
        //     element: <DirectorSignUp />, },
        //   { path: "hostsignup",
        //     element: <HostSignUp />, }
        // ]
      },
      {
        path: "directorsignup",
        element: <DirectorSignUp />,
      },
      {
        path: "hostsignup",
        element: <HostSignUp />,
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
    ],
  },
]);


export default router;