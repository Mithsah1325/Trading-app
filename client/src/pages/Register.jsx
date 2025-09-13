import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/api/register", { name, email, password });
      alert("Registered! Please login.");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="p-6 bg-white shadow rounded-xl">
      <h2 className="text-xl font-bold mb-3">Register</h2>
      <input className="border p-2 w-full mb-2" placeholder="Name"
        value={name} onChange={(e) => setName(e.target.value)} />
      <input className="border p-2 w-full mb-2" placeholder="Email"
        value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" className="border p-2 w-full mb-2" placeholder="Password"
        value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister} className="bg-green-500 text-white px-4 py-2 rounded-lg">
        Register
      </button>
    </div>
  );
};

export default Register;
