import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/register", {
        name,
        email,
        password,
      });
      alert("✅ Registered successfully! Please login.");
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      alert("❌ Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Create an Account ✨
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Join us and start your journey
        </p>

        <div className="space-y-4">
          <input
            className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-inner text-gray-700 
            focus:ring-2 focus:ring-green-400 focus:outline-none transition-all"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-inner text-gray-700 
            focus:ring-2 focus:ring-green-400 focus:outline-none transition-all"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-inner text-gray-700 
            focus:ring-2 focus:ring-green-400 focus:outline-none transition-all"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full py-3 rounded-lg bg-green-600 hover:bg-green-700 active:scale-95
            text-white font-semibold shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-green-600 font-medium hover:underline"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
