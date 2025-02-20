import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

const endpoints = {
  login: "/login/",
  signup: "/users/",
  getTeachers: "/teachers/all/",
  postImage: "/images/",
  postMcq: "/quizzes/",
  getImagesByTeachers:"/images/",
  getQuizzesByImage:"/quizzes/"
};

export const loginUser = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}${endpoints.login}`, {
        email,
        password,
      });
      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };
  
  export const signupUser = async (userData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}${endpoints.signup}`, userData);
      return response;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

export const getTeachers = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoints.getTeachers}`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch teachers");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getImagesByTeachers = async (teacherId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoints.getImagesByTeachers}${teacherId}/`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch teachers");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getQuizzesByImage = async (imageId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoints.getQuizzesByImage}${imageId}/`);
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error("Failed to fetch teachers");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const postImage = async (imageFile, description, teacherId) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("description", description);
  formData.append("teacher", teacherId);

  try {
    const response = await axios.post(`${API_BASE_URL}${endpoints.postImage}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 201) {
      return response.data.id;
    } else {
      throw new Error("Failed to save the image.");
    }
  } catch (error) {
    console.error("An error occurred while saving the image:", error);
    throw error;
  }
};

export const postMcq = async (question, imageId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}${endpoints.postMcq}`,
      {
        question: question.question,
        option1: question.option_1,
        option2: question.option_2,
        option3: question.option_3,
        option4: question.option_4,
        answer: question.correct_answer,
        level_difficult: question.Difficulty_Level,
        image: imageId,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 201) {
      throw new Error("Failed to post question.");
    }
  } catch (error) {
    console.error("An error occurred while posting a question:", error);
    throw error;
  }
};
