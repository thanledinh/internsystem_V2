import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { accessToken } = useSelector((state) => state.auth);

  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
