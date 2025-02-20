import React, { useState, useEffect } from "react";
import "../Assets/Styles/questions.css";
import McqGeneratedComponent from "../Components/mcqGeneratedComponent/mcqGeneratedComponenet";
import { getQuizzesByImage } from "../Api/apiService";
import { useParams } from "react-router-dom";
import config from "../Config/config";

const QuizHistory = () => {
  const [mcqs, setMcqs] = useState([]);
  const { id, imageUrl } = useParams();
  const decodedImageUrl = decodeURIComponent(imageUrl);

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const data = await getQuizzesByImage(id);
      setMcqs(data);
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="questions-container">
      <div className="image-container">
        {decodedImageUrl && (
          <img src={`${config.BASE_URL}${decodedImageUrl}`} alt="Header" className="header-image" />
        )}
      </div>
      <div className="questions-content">
        <div className="question-grid">
          {mcqs.map((item, index) => (
            <div className="question-grid2" key={index}>
              {
                <McqGeneratedComponent
                  questionNumber={index + 1}
                  question={item.question}
                  option1={item.option1}
                  option2={item.option2}
                  option3={item.option3}
                  option4={item.option4}
                  correctOption={item.answer}
                  difficultyLevel={item.level_difficult}
                />
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizHistory;
