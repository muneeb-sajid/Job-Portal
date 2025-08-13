import React, { useState } from 'react';
import "../Login/login.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [Role, setRole] = useState("applicant"); // default role
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [btn,setBtn] = useState(false);



  const signup = () => {
    navigate('/SignUp');
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = { Email, Password, Role };

    try {
      const response = await axios.post('http://localhost:3000/user/signIn', userData);
      const { Error, message, success } = response.data;

      if (Error) {
        toast.error(Error);
      } else if (success) {
        localStorage.setItem("Email", Email);
        localStorage.setItem("isAuth", "true");
        localStorage.setItem("role", Role.toLowerCase());

        // Wait 2 seconds, then navigate and pass toast message
        setBtn(true);
        setTimeout(() => {
          if (Role.toLowerCase() === "admin") {
            navigate("/admin", { state: { toastMsg: message } });
          } else if (Role.toLowerCase() === "applicant") {
            navigate("/applicant", { state: { toastMsg: message } });
          }
        }, 2000);
        
      }
    } catch (error) {
      console.error("SignIn error:", error);
      toast.error("An error occurred during sign in.");
      setBtn(false);
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">
              Email Address <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="email"
              id="loginEmail"
              placeholder="you@example.com"
              className="form-input"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              Password <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="password"
              id="loginPassword"
              placeholder="Password"
              className="form-input"
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

          <button className="login-button">
            {btn? "Redirecting" : "LogIn"}
            </button>

          <p className="p">
            Don't have an account?{" "}
            <a href="#"  onClick={signup}>
              SignUp
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
