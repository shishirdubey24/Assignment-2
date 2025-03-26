import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("isAuthenticated"); // Remove login state
    alert("Logged out successfully!");
    navigate("/login"); // Redirect to login
  }, [navigate]);

  return null; // No UI needed
};
