import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import './pages.css';


function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/signup",
        { email, password, name }
      );

      // assuming backend returns token
      localStorage.setItem("token", res.data.token);

      navigate("/feed");

    } catch (error) {
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Something went wrong");
      }
      console.log(error);
    }
  }

  return (
    <div className="page">
      <div className="brand-section">
        <h1 className="brand-title">PostBuzz</h1>
        <p className="brand-tagline">Connect. Share. Create your buzz.</p>
      </div>
      <div className="login-section">
        <div className="signup">
          <h1>Sign Up</h1>
          <form className="content" onSubmit={submit}>
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

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="UserName"
              required
            />

            <button type="submit">Sign Up</button>
          </form>

          <p>
            Already have an account? &nbsp;
            <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
