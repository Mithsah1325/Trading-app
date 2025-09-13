import React, { useState } from "react";
import axios from "axios";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <h2 className="text-xl font-bold mb-3">Login</h2>
      <input className="border p-2 w-full mb-2" placeholder="Email"
        value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" className="border p-2 w-full mb-2" placeholder="Password"
        value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
        Login
      </button>
    </div>
  );
};

export default Login;
