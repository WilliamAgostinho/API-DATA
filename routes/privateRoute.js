import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  // Se não tiver token, redireciona para login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Se tiver token, renderiza o componente protegido (filho)
  return children;
}
