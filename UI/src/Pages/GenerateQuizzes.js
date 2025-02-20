import React, { useState, useRef } from "react";
import ReactLoading from "react-loading";
import axios from "axios";
import "../Assets/Styles/GenerateQuizzes.css";
import { useNavigate } from "react-router-dom";
// import Alert from "@mui/material/Alert";
import Textarea from "@mui/joy/Textarea";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const GenerateMCQs = () => {
  const [file, setFile] = useState(null);
  // const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [context, setContext] = useState("");

  const readURL = (input) => {
    if (input.files && input.files[0]) {
      const reader = new FileReader();

      reader.onload = (e) => {
        document.querySelector(".image-upload-wrap").style.display = "none";
        document.querySelector(".file-upload-image").src = e.target.result;
        document.querySelector(".file-upload-content").style.display = "block";
      };

      reader.readAsDataURL(input.files[0]);
    } else {
      removeUpload();
    }
  };

  const removeUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setFile(null);
    document.querySelector(".file-upload-content").style.display = "none";
    document.querySelector(".image-upload-wrap").style.display = "block";
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    readURL(e.target);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      NotificationManager.error(
        "Error message",
        "Please upload an image file.",
        5000
      );
      // setError("Please upload an image file.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("context", context);
    console.log(formData);
    document.querySelector(".react-loading").style.display = "flex";
    document.querySelector(".remove-image").style.display = "none";
    document.querySelector(".generate-button").style.display = "none";
    document.querySelector(".text-context").style.display = "none";

    try {
      const response = await axios.post(
        "http://localhost:8000/api/generate-mcqs/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        navigate("/questions", {
          state: {
            mcqs: response.data.mcqs,
            imageFile: file,
            imageUrl: URL.createObjectURL(file),
          },
        });
      } else {
        document.querySelector(".remove-image").style.display = "";
        document.querySelector(".generate-button").style.display = "";
        document.querySelector(".react-loading").style.display = "none";
        document.querySelector(".text-context").style.display = "";
        NotificationManager.error("Error message", "Failed to generate MCQs.");
        // setError("Failed to generate MCQs.");
      }
    } catch (error) {
      document.querySelector(".remove-image").style.display = "";
      document.querySelector(".generate-button").style.display = "";
      document.querySelector(".text-context").style.display = "";
      document.querySelector(".react-loading").style.display = "none";
      NotificationManager.error(
        "Error message",
        "An error occurred while generating MCQs."
      );
      // setError("An error occurred while generating MCQs.");
    }
  };
  const handleQuizHistoryClick = (event) => {
    event.preventDefault();
    navigate("/quizHistoryList/");
  };

  return (
    <>
      <div className="generate-container">
        <div className="generate-form">
          <form onSubmit={handleSubmit}>
            <div className="file-upload">
              <button
                className="file-upload-btn"
                type="button"
                onClick={() => fileInputRef.current.click()}
              >
                Add Image
              </button>
              <div className="image-upload-wrap">
                <input
                  ref={fileInputRef}
                  className="file-upload-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <div className="drag-text">
                  <h3>Drag and drop an image or select add Image</h3>
                </div>
              </div>
              <div className="file-upload-content">
                <img className="file-upload-image" src="#" alt="yourimage" />
                <div className="image-title-wrap">
                  <button
                    type="button"
                    onClick={removeUpload}
                    className="remove-image"
                  >
                    Remove
                  </button>
                </div>
                <div className="react-loading">
                  <ReactLoading
                    type="bars"
                    color="rgb(24,190,178)"
                    height={"15%"}
                    width={"15%"}
                  />
                </div>
              </div>
            </div>
            <div className="text-context" style={{ paddingTop: "25px" }}>
              <Textarea
                color="warning"
                disabled={false}
                minRows={2}
                placeholder="                                  WRITE ADDITIONAL CONTEXT IF YOU NEED!"
                variant="outlined"
                onChange={(e) => setContext(e.target.value)}
              />
            </div>
            <div className="generate-button">
              <button onClick={handleQuizHistoryClick}>Quiz History</button>
              <button type="submit">Generate Quiz</button>
            </div>
          </form>
        </div>
      </div>
      <NotificationContainer />
    </>
  );
};

export default GenerateMCQs;
