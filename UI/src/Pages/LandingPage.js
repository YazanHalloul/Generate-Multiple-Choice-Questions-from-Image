import React from "react";
import "../Assets/Styles/landingPage.css";
import { useNavigate } from "react-router-dom";

function LandingPage({logoName, title, mainTask, buttonText, navigateDirection}) {
  const navigate = useNavigate();
  
  return (
    <div className="mainScreen">
      <div className="container">
        <img src={require(`../Assets/Images/${logoName}`)} alt="Logo" className="logo" />
        <h1>{title}</h1>
        <p>
          {mainTask}
        </p>
        <button className="start-btn" onClick={() => navigate(`/${navigateDirection}`)}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
