import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  errorResponseClear,
  getCurrUserResponseClear,
} from "../redux/Login/LoginActions";

const ProtectedRoute = () => {
  const { error_response } = useSelector((state) => state.LoginReducer);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  //UNAUTHORIZED
  useEffect(() => {
    if (!error_response) return;
    if (error_response?.response?.data?.message === "Unauthorized") {
      toast.error("Session Expired!");
      dispatch(getCurrUserResponseClear());
      localStorage.clear();
    }
    dispatch(errorResponseClear());
  }, [error_response]);

  return token ? <Outlet /> : <Navigate to="/Login" />;
};

export default ProtectedRoute;
