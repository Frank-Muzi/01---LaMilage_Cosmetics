import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"; // make sure this matches your provider

const PrivateRoute = ({ children }) => {
  const { user } = useContext(UserContext); // get user from UserContext

  // if no user, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // if logged in, render children
  return children;
};

export default PrivateRoute;