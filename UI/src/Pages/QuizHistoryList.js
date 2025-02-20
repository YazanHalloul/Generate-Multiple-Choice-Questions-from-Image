import React, { useState, useContext, useEffect } from 'react';
import '../Assets/Styles/QuizHistoryList.css'
import { UserContext } from './Context/Context';
import { getImagesByTeachers } from '../Api/apiService';
import config from '../Config/config';
import { useNavigate } from 'react-router-dom';

const QuizHistoryList = () => {
  const [images, setImages] = useState([])
  const { auth } = useContext(UserContext);
  const navigate = useNavigate();


  useEffect(() => {
    fetchImages();
  }, []);

  const handleQuizClick = (id, imageUrl) => {
    const encodedImageUrl = encodeURIComponent(imageUrl);
    navigate(`/quizHistory/${id}/${encodedImageUrl}`);
  };

  const fetchImages = async () => {
    try {
      const data = await getImagesByTeachers(auth.id);
      setImages(data)
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };


  return (
    <div className="quiz-list-container">
      {images.map((quiz, index) => (
        <div
          key={quiz.id}
          className="quiz-item"
          onClick={() => handleQuizClick(quiz.id, quiz.image)}
        >
          <div className="quiz-image-container">
            <img src={`${config.BASE_URL}${quiz.image}`} alt={quiz.id} className="quiz-image" />
          </div>
          <div className="quiz-name">Quiz {index + 1}</div>
        </div>
      ))}
    </div>
  );
};

export default QuizHistoryList;
