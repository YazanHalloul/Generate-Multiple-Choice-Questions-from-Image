import React, { useState, useEffect, useContext } from "react";
import McqQuizComponent from "../Components/McqQuizComponent/McqQuizComponent";
import "../Assets/Styles/Quiz.css";
import { getQuizzesByImage, getImagesByTeachers } from "../Api/apiService";
import config from "../Config/config";
import { UserContext } from "./Context/Context";

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizzes, setQuizzes] = useState([]);
  const [image, setImage] = useState([]);
  const { auth } = useContext(UserContext);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const images = await getImagesByTeachers(auth.id);
        const selectedImage = images[Math.floor(Math.random() * images.length)];
        setImage(selectedImage);
        
        if (selectedImage && selectedImage.id) {
          const quizzes = await getQuizzesByImage(selectedImage.id);
          setQuizzes(quizzes);
        }
      } catch (error) {
        alert("An error occurred. Please try again.");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="question-container">
      <div className="image">
        {image ? (
          <img src={`${config.BASE_URL}${image.image}`} alt="" />
        ) : (
          <p>Loading image...</p>
        )}
      </div>
      {quizzes.length > 0 ? (
        <McqQuizComponent
          question={quizzes[currentQuestion]}
          onSelectOption={setSelectedOption}
          selectedOption={selectedOption}
          onSend={setCurrentQuestion}
          questionNumber={currentQuestion}
          totalNumberOfQuestions={quizzes.length}
        />
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
};

export default Quiz;
