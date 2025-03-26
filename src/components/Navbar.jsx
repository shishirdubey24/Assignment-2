import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check login status from localStorage
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsLoggedIn(authStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); // Clear authentication
    localStorage.removeItem("user"); // Optional: Clear user data
    setIsLoggedIn(false);
    navigate("/login"); // Redirect to login page
  };
console.log("NavBar loaded")
  return (
    <nav className="bg-gradient-to-r from-gray-900 to-black text-white shadow-lg p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-gray-800">
          TaskMate
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
          <Link to="/about" className="hover:text-yellow-400 transition">About</Link>
          <Link to="/contact" className="hover:text-yellow-400 transition">Contact</Link>
        </div>

        {/* Auth Buttons */}
        <div className="flex space-x-4">
          {/* Always show Register & Login buttons */}
          <Link
            to="/register"
            className="bg-gray-800 px-4 py-2 rounded-lg hover:bg-yellow-600 transition"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="bg-gray-800 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </Link>

          {/* Show Logout only if logged in */}
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
