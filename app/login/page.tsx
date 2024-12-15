'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaUser, FaLock } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import './login.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    if (username === "admin" && password === "password123") {
      localStorage.setItem("isLoggedIn", "true");
      router.push("/dashboard");
    } else {
      alert("Username atau password salah!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="avatar">
          <img src="/bubu.png" alt="Avatar" />
        </div>
        <h1>LOGIN KE AKUN ANDA</h1>
        <div className="input-group">
          <span className="icon">
            <FaUser />
          </span>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <span className="icon">
            <FaLock />
          </span>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Kata Sandi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className="icon-eye" onClick={togglePasswordVisibility}>
            {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        </div>
        <button onClick={handleLogin}>LOGIN</button>
        <div className="footer-links">
          <a href="#">Log in</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;