import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ user, children }) => {
  if (!user) {
    sessionStorage.clear();
    return <Navigate to="/sign-in" replace />;
  }
  
  sessionStorage.setItem("user", user);
  return children;
};
