import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, children }) => {
  // Fallback to localStorage if user state is not yet updated
  const storedUser = localStorage.getItem("user");
  const activeUser = user || (storedUser && JSON.parse(storedUser));

  if (!activeUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
