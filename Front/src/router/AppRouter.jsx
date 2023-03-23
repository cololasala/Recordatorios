import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, SignIn, SignUp } from "../components";
import { Organizer } from "../components/Organizer";
import { ProtectedRoute } from "../guards/ProtectedRoute";
import { Calendar } from "../components/Calendar";

export const AppRouter = () => {
  const [user, setUser] = useState(null);

  return (
    <Routes>
      <Route
        path="sign-in"
        element={<SignIn user={(user) => setUser(user)} />}
      ></Route>
      <Route path="sign-up" element={<SignUp />}></Route>

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute user={user || sessionStorage.getItem("user")}> {/* primera vez no tendre sessionStorage (uso el user del state), si ya tiene el session uso el session */}
            <Dashboard />
          </ProtectedRoute>
        }
      ></Route>

      <Route path="/*" element={<Navigate to="/dashboard" />}></Route>
    </Routes>
  );
};
