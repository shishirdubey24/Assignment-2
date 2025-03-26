import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Register } from "./components/Register";
import { Login } from "./components/Login";
import DashBoard from "./components/DashBoard";
import "./App.css";

import Navbar from "./components/Navbar";
import { Logout } from "./components/Logout";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
   
      <Router>  {/* ✅ Wrap everything inside Router */}
        <div>
          {/* ✅ Show Navbar only if user is authenticated */}
          {localStorage.getItem("isAuthenticated") === "true" && <Navbar />}

          <Routes>
            {/* Redirect to Register First */}
            <Route path="/" element={<Navigate to="/register" />} />

            {/* Public Routes */}
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
        </div>
      </Router>  
   
  );
};

export default App;
