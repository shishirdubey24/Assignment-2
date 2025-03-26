import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import DashBoard from "./components/DashBoard";
import "./App.css";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Logout } from "./components/Logout";

// ✅ Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  // ✅ Re-check authentication on state changes
  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
    };
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  return (
    <Router>
      {/* ✅ Navbar is always visible, authentication just controls its buttons */}
      <Navbar isAuthenticated={isAuthenticated} />

      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        {/* ✅ Protected Route (Only for Logged-in Users) */}
        <Route
          path="/todo"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
