import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useStore from "./store";

export const ProtectedRoute = () => {
  const isLogined = useStore(state => state.isLogined);

  return isLogined ? <Outlet /> : <Navigate to="/login/loginPage" />;
};

export const AdminProtectedRoute = () => {
  const adminLogined = useStore(state => state.adminLogined);

  return adminLogined ? <Outlet /> : <Navigate to="/admin/login" />;
};
