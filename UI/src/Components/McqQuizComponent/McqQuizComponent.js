import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const McqQuizComponent = ({
  question,
  onSelectOption,
  selectedOption,
  onSend,
  questionNumber,
  totalNumberOfQuestions,
}) => {
  const navigate = useNavigate();
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // Set timer to 2 minutes (120 seconds)

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1) {
          clearInterval(countdown);
          navigate("/quizFinish", {
            state: {
              correctAnswers: correctAnswers,
              incorrectAnswers: totalNumberOfQuestions - correctAnswers,
            },
          });
          return 0;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [correctAnswers]);


  function sanitizeOption(option) {
    // Remove any leading label like "a)", "b)", "c)", "d)" from the option
    return option.replace(/^[a-d]\)\s*/, "");
  }
  const handleSend = () => {
    if (selectedOption) {
      const correctAnswer = `option-${question.answer.charAt(0).toLowerCase()}`;
      if (correctAnswer === selectedOption) {
        setCorrectAnswers(correctAnswers + 1);
        console.log("yess")
      }
      const correctOption = document.getElementById(`${correctAnswer}`);
      const icon = document.createElement("i");
      icon.classList.add("fas", "fa-check", "correct-icon");
      icon.style.marginLeft = "10px";
      correctOption
        .querySelector("div")
        .insertBefore(icon, correctOption.querySelector("img"));
      correctOption.classList.add("animate-opacity");

      setTimeout(() => {
        if (questionNumber < totalNumberOfQuestions - 1) {
          onSend(questionNumber + 1);
          onSelectOption(null);
          correctOption.classList.remove("animate-opacity");
          const icon = document.getElementsByClassName("correct-icon");
          icon[0].remove();
        } else {
          navigate("/quizFinish", {
            state: {
              correctAnswers: correctAnswers,
              incorrectAnswers: totalNumberOfQuestions - correctAnswers,
            },
          });
        }
      }, 1000);
    }
  };

  return (
    <div className="question-form">
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={require("../../Assets/Images/question.png")}
          alt=""
          style={{ float: "left", width: 50, marginRight: 10 }}
        />
        <h2 id="question-number">
          Question {questionNumber + 1}/{totalNumberOfQuestions}
        </h2>
        <div id="timer" style={{ marginLeft: "auto", fontSize: "1.5rem", color:"rgba(228, 81, 21, 1)" }}>
          {Math.floor(timeLeft / 60)}:{("0" + (timeLeft % 60)).slice(-2)}
        </div>
      </div>
      <h3 id="question-text">{question.question}</h3>
      <div className="answers">
        {["a", "b", "c", "d"].map((letter, index) => (
          <div
            key={index}
            data-cy="answer"
            onClick={() => onSelectOption(`option-${letter}`)}
            className={`option ${
              selectedOption === `option-${letter}` ? "selected" : ""
            }`}
            id={`option-${letter}`}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src={require(`../../Assets/Images/option-letter/letter-${letter}.png`)}
                alt=""
                style={{ float: "left", width: 50, marginRight: 10 }}
              />
              <p id={`option-${letter}-text`}>
                {sanitizeOption(question[`option${index + 1}`])}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button id="sendButton" onClick={handleSend}>
        Send
      </button>
    </div>
  );
};

export default McqQuizComponent;

