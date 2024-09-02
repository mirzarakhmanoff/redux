import React from "react";
import { useSelector } from "react-redux";
import Home from "../../pages/Home";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  return token ? <Outlet /> : <Navigate replace to="/login" />;
};

export default Auth;
