import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import DashBoard from "./components/DashBoard";
import { Logout } from "./components/Logout";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import "./App.css";

// ✅ Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  // ✅ Listen for authentication state changes
  useEffect(() => {
    const checkAuth = () => {
      console.log("🔄 Checking Authentication...");
      setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
    };

    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  return (
    <Router>
      {/* ✅ Navbar is always shown */}
      <Navbar isAuthenticated={isAuthenticated} />

      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        {/* ✅ Protected Route */}
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
