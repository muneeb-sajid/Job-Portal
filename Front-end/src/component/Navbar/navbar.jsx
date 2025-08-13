import React, { useState, useEffect, useRef } from "react";
import "../Navbar/navbar.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Navbar = () => {
 
  return (
    <div className="parent">
      <div className="logo">
        <div className="logo-box">J</div>
        Search
      </div>

      <div className="table">
        <ul>
            <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/jobs">Browse Jobs</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li id="btn"><Link to="/login">Join</Link></li>
            </>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
