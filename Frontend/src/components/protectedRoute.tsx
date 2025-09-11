import type { JSX } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  children,
  requiredRole,
}: {
  children: JSX.Element;
  requiredRole?: string;
}) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role")?.toLocaleLowerCase();

  if (!token) {
    return <Navigate to="/login" replace />;
  }
  if (requiredRole && role !== requiredRole.toLowerCase()) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
