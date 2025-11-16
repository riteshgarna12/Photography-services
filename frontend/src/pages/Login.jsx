import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    navigate("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow p-6 rounded">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <input className="w-full p-2 border mb-2"
          placeholder="Email" onChange={(e)=>setEmail(e.target.value)} />
        
        <input className="w-full p-2 border mb-2"
          type="password" placeholder="Password"
          onChange={(e)=>setPassword(e.target.value)} />
        
        <button className="bg-blue-600 text-white w-full p-2 rounded">Login</button>
      </form>
    </div>
  );
}
