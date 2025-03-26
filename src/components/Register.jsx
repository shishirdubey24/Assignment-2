import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(user)); // Save user details
    alert("Registration Successful! Please log in.");
    navigate("/login"); // Redirect to login
  };

  return (
    <div className="flex items-center mt-1 justify-center min-h-screen">
  

      <form onSubmit={handleRegister} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required className="border p-2 w-full mb-2" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required className="border p-2 w-full mb-4" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Register</button>
      </form>
    </div>
  );
};
