import React, { useState, useContext } from "react";
import { UserContext } from "./Context/Context";
import { useLocation } from "react-router-dom";
import "../Assets/Styles/questions.css";
import McqGeneratedComponent from "../Components/mcqGeneratedComponent/mcqGeneratedComponenet";
import { postMcq, postImage } from "../Api/apiService";
import McqFormComponent from "../Components/McqFormComponent/McqFormComponent";

const Questions = () => {
  const { auth } = useContext(UserContext);
  const location = useLocation();
  const { mcqs: initialMcqs, imageFile, imageUrl } = location.state || { mcqs: [], imageFile: null, imageUrl: '' };
  const [mcqs, setMcqs] = useState(initialMcqs);
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentMcq, setCurrentMcq] = useState({
    question: '',
    option_1: '',
    option_2: '',
    option_3: '',
    option_4: '',
    correct_answer: '',
    Difficulty_Level: '',
  });
  const [newMcq, setNewMcq] = useState({
    question: '',
    option_1: '',
    option_2: '',
    option_3: '',
    option_4: '',
    correct_answer: '',
    Difficulty_Level: '',
  });



  const handleSave = async () => {
    if (!imageFile) {
      alert("Image file is missing!");
      return;
    }
    if (mcqs.length === 0){
      alert("There is no mcq to post!");
      return;
    }

    try {
      const imageId = await postImage(imageFile, "imageDescription", auth.id);
      const mcqPromises = mcqs.map((question) => postMcq(question, imageId));
      await Promise.all(mcqPromises);
      alert("MCQs saved successfully!");
    } catch (error) {
      alert("An error occurred while saving the image or MCQs.");
    }
  };

  const handleChange = (e, field, isEditing) => {
      setNewMcq({
        ...newMcq,
        [field]: e.target.value,
      });
  };
  const handleChangeEdit = (e, field, isEditing) => {
      setCurrentMcq({
        ...currentMcq,
        [field]: e.target.value,
      });
  };
 
 

  const handleEdit = (index) => {
    setCurrentMcq(mcqs[index]);
    setEditingIndex(index);
  };

  const handleSubmitEdit = () => {
    const updatedMcqs = [...mcqs];
    updatedMcqs[editingIndex] = currentMcq;
    setMcqs(updatedMcqs);
    setEditingIndex(null);
    setCurrentMcq({
      question: '',
      option_1: '',
      option_2: '',
      option_3: '',
      option_4: '',
      correct_answer: '',
      Difficulty_Level: '',
    });
  };

  const handleDelete = (index) => {
    const updatedMcqs = mcqs.filter((_, i) => i !== index);
    setMcqs(updatedMcqs);
  };

  const handleAddNew = () => {
    setMcqs([...mcqs, newMcq]);
    setNewMcq({
      question: '',
      option_1: '',
      option_2: '',
      option_3: '',
      option_4: '',
      correct_answer: '',
      Difficulty_Level: '',
    });
  };
  return (
    <div className="questions-container">
      <div className="image-container">
        {imageUrl && (
          <img src={imageUrl} alt="Header" className="header-image" />
        )}
      </div>
      <div className="questions-content">
        <div className="question-grid">
          {mcqs.map((item, index) => (
            <div className="question-grid2" key={index}>
              {editingIndex === index ? (
                <div className="question-item">
                  <McqFormComponent
                  mcq={currentMcq}
                  handleChange={handleChangeEdit}
                  handleSubmit={handleSubmitEdit}
                  buttonText="Save"
                />
                </div>
              ) : (
                <McqGeneratedComponent
                  questionNumber={index + 1}
                  question={item.question}
                  option1={item.option_1}
                  option2={item.option_2}
                  option3={item.option_3}
                  option4={item.option_4}
                  correctOption={item.correct_answer}
                  difficultyLevel={item.Difficulty_Level}
                />
              )}
              <div className="edit-delete-btn">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          <div className="question-grid2">
            <div className="question-item">
            <McqFormComponent
            mcq={newMcq}
            handleChange={handleChange}
            handleSubmit={handleAddNew}
            buttonText="Add New MCQ"
          />
            </div>
          </div>
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questions;
