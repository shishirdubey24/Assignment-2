import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === credentials.email && storedUser.password === credentials.password) {
      localStorage.setItem("isAuthenticated", "true"); // Set login status
      alert("✅ Login Successful!");
      navigate("/todo"); // Redirect to Todo page after login
    } else {
      alert("❌ Invalid credentials! Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="border p-2 w-full mb-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="border p-2 w-full mb-4 rounded"
        />
        <button type="submit" className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
          Login
        </button>
      </form>
    </div>
  );
};
