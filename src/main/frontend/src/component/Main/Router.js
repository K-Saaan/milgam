import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from ".//Main.js";
import Login from "../Login/Login.js";
import Signup from "../Signup/Signup.js";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Main />}>
            <Route index element={<Login />} />
            <Route path="signup" element={<Signup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;