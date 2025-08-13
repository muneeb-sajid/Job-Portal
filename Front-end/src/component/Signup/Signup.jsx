import React, { useState } from "react";
import "../Signup/Signup.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate} from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [Role, setRole] = useState("applicant");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");

  const login = () => {
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { Name, Email, Password, Role };

    try {
      const response = await axios.post('http://localhost:3000/user/signUp', userData);
      const { Error, Message } = response.data;

      if (Error) {
        toast.error(Error);
      } else {
        toast.success(Message || "Signup successful!");
        //Change Navbar Content Based on the role
        localStorage.setItem("isAuth", "true");
        // Redirect based on role
        if (Role.toLowerCase() === "admin") {
          localStorage.setItem("role", Role.toLowerCase());
          navigate("/admin");
        } else {
          navigate("/applicant");
        }
          
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("An error occurred during sign up.");
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <h2 className="login-title">Sign Up</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="form-input"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="form-input"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="form-input"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Role</label>
            <select
              className="form-input"
              value={Role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="applicant">Applicant</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button className="login-button" type="submit">
            Sign Up
          </button>

          <p className='p'>
            Have an account?{" "}
            <span
              onClick={login}
              style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
