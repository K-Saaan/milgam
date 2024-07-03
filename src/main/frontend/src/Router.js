import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import AdminLogIn from "./routes/AdminLogIn";
import Dashboard from "./routes/Dashboard";
import FaQ from "./routes/FaQ";
import LogIn from "./routes/LogIn";
import Home from "./routes/Home";
import SignUp from "./routes/SignUp";
import UploadVideo from "./routes/UploadVideo";
import Detail from "./routes/Detail";

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
        element: <AdminLogIn />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          { path: "detail",
          element: <Detail />, }
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
        path: "home",
        element: <Home />,
      },
    ],
  },
]);


export default router;