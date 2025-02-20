import React from "react";

function sanitizeOption(option) {
  // Remove any leading label like "a)", "b)", "c)", "d)" from the option
  return option.replace(/^[a-d]\)\s*/, '');
}

function McqGeneratedComponent(probs) {
  const sanitizedOptions = [
    sanitizeOption(probs.option1),
    sanitizeOption(probs.option2),
    sanitizeOption(probs.option3),
    sanitizeOption(probs.option4),
    sanitizeOption(probs.correctOption)
  ];

  return (
    <div className="question-item">
      <p className="question-text">{probs.questionNumber}) {probs.question}</p>
      <div className="options">
        <div className="option" style={{padding: '5px'}}>
          <p>a) {sanitizedOptions[0]}</p>
        </div>
        <div className="option" style={{padding: '5px'}}>
          <p>b) {sanitizedOptions[1]}</p>
        </div>
        <div className="option" style={{padding: '5px'}}>
          <p>c) {sanitizedOptions[2]}</p>
        </div>
        <div className="option" style={{padding: '5px'}}>
          <p>d) {sanitizedOptions[3]}</p>
        </div>
        <div className="option" style={{padding: '5px'}}>
          <p>Correct option: {sanitizedOptions[4]}</p>
        </div>
        <div className="option" style={{padding: '5px'}}>
          <p>Difficulty level: {probs.difficultyLevel}</p>
        </div>
      </div>
    </div>
  );
}

export default McqGeneratedComponent;
