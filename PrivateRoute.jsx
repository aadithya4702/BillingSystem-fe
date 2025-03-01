// PrivateRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./src/context/UserContext";

const PrivateRoute = ({ component }) => {
  const { user } = useContext(UserContext);

  if (!user) {
    // If user is not authenticated, redirect to the login page
    return <Navigate to="/auth" replace />;
  }

  // If user is authenticated, render the protected route
  return component;
};

export default PrivateRoute;
