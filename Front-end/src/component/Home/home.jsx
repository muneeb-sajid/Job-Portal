import React, { useEffect, useState } from "react";
import "../Home/home.css";
import { toast } from "react-toastify";
import axios from "axios";

// Import all possible icon sets
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';
import * as GiIcons from 'react-icons/gi';
import * as SiIcons from 'react-icons/si';


const getIconComponent = (iconName) => {
  return (
    FaIcons[iconName] ||
    RiIcons[iconName] ||
    GiIcons[iconName] ||
    SiIcons[iconName] ||
    null
  );
};

const Home = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:3000/home/user");
        setCompanies(response.data);
      } catch (error) {
        toast.error("Error to fetch data");
      }
    };
    fetchCompanies();
  }, []);

  return (
    <>
      <div className="container">
        <div className="text">
          <h1 id="h1">
            Find the perfect <br />Dream Job service for <br /> your Career
          </h1>
          <p>
            Work with talented and reputable companies for the career and
            explore opportunities
          </p>
          <div className="input-container">
            <input type="text" placeholder="What are you searching for?" />
            <button>Search</button>
          </div>
        </div>
        <div className="pic-sec">
          <img
            id="img1"
            src="https://storage.googleapis.com/a1aa/image/0c620f32-7ab3-4033-1935-99d7102c0b6a.jpg"
            alt="Picture"
          />
          <img
            id="img2"
            src="https://storage.googleapis.com/a1aa/image/249975fa-9ba2-4982-8b57-ea4c2dbc8831.jpg"
            alt="Picture"
          />
        </div>
      </div>

     

      <div className="tech-giants-section">
        <h2>Join the Ranks of These</h2>
        <h2>Tech Giants</h2>
        <p>
          Our alumni and network have connections with, or work at, some of the
          world's leading technology companies. See where your career could take
          you!
        </p>

        <div className="company-grid">
          {companies.map((company) => {
            const Icon = getIconComponent(company.icon);
            return (
              <div key={company.name} className="company-card">
                <div className="company-logo">
                  {Icon && <Icon size="80px" />}
                </div>
                <div className="company-name">{company.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
