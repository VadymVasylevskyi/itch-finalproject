// components/PublicRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  return isAuthenticated() ? <Navigate to="/" /> : <>{children}</>;
};

export default PublicRoute;
