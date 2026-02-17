import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './pages.css';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/login",
        { email, password }
      );

      // Save token
      localStorage.setItem("token", res.data.token);

      // Redirect
      navigate("/feed");

    } catch (error) {
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Invalid credentials");
      }
      console.log(error);
    }
  }

  return (
    <div className="login">
      <h1>Login</h1>

      <form className="content" onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />

        <button type="submit">Login</button>
      </form>

      <p>Don't have an account?</p>
      <Link to="/">Signup</Link>
    </div>
  );
}

export default Login;
