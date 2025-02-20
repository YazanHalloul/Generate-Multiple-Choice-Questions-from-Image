import React from "react";
import "../Assets/Styles/landingPage.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function QuizResults() {
  const navigate = useNavigate();
  const location = useLocation();
  const percentage = (value, total) => ((value / total) * 100).toFixed();

  const { correctAnswers, incorrectAnswers } = location.state || {
    correctAnswers: null,
    incorrectAnswers: null,
  };
  return (
    <div className="mainScreen">
      <div className="container">
        <img
          src={require(`../Assets/Images/check.png`)}
          alt="Logo"
          className="logo"
        />
        <h1>QUIZ COMPLETED!</h1>
        <div className="result-info-container">
          <div className="result-info">
            <div className="correct">
              <span className="icon">&#x2714;</span>
              {correctAnswers} correct <strong>{percentage(correctAnswers, correctAnswers + incorrectAnswers)}%</strong>
            </div>
            <div className="incorrect">
              <span className="icon">&#x2716;</span>
              {incorrectAnswers} incorrect <strong>{percentage(incorrectAnswers, correctAnswers + incorrectAnswers)}%</strong>
            </div>
          </div>
        </div>
        <button className="start-btn" onClick={() => navigate("/")}>
          Start Over
        </button>
      </div>
    </div>
  );
}

export default QuizResults;
