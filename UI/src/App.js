import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import GenerateMCQs from "./Pages/GenerateQuizzes";
import Questions from "./Pages/Questions";
import AuthPage from "./Pages/Auth/AuthPage";
import PrivateRoute from "./Routes/PrivateRoute";
import Quiz from "./Pages/Quiz";
import QuizHistoryList from "./Pages/QuizHistoryList";
import QuizResults from "./Pages/QuizResults";
import QuizHistory from "./Pages/QuizHistory";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/teacherPage"
          element={
            <PrivateRoute>
              <LandingPage
                title="IMAGE QUIZ"
                logoName="logo.png"
                mainTask="Generate multiple choice questions using image visibility information."
                buttonText="Generate Quiz"
                navigateDirection="generateMcqs"
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/studentPage"
          element={
            <PrivateRoute>
              <LandingPage
                title="IMAGE QUIZ"
                logoName="logo.png"
                mainTask="Ready to challenge your visual knowledge? Answer all the questions about the image correctly."
                buttonText="Start Quiz"
                navigateDirection="quiz"
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/quizFinish"
          element={
            <PrivateRoute>
              <QuizResults/>
            </PrivateRoute>
          }
        />
        <Route
          path="/generateMcqs"
          element={
            <PrivateRoute>
              <GenerateMCQs />
            </PrivateRoute>
          }
        />
        <Route
          path="/questions"
          element={
            <PrivateRoute>
              <Questions />
            </PrivateRoute>
          }
        />
        <Route
          path="/quiz"
          element={
            <PrivateRoute>
              <Quiz />
            </PrivateRoute>
          }
        />
        <Route
          path="/quizHistoryList"
          element={
            <PrivateRoute>
              <QuizHistoryList />
            </PrivateRoute>
          }
        />
        <Route
          path="/quizHistory/:id/:imageUrl"
          element={
            <PrivateRoute>
              <QuizHistory />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/auth" />} />
      </Routes>
    </Router>
  );
};

export default App;

