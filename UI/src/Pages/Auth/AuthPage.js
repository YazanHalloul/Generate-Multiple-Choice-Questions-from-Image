import React, { useState } from "react";
import Login from "./login";
import Signup from "./signup";
import "../../Assets/Styles/AuthPage.css";

const AuthPage = () => {
  const [currentView, setCurrentView] = useState("logIn");

  const switchToLogin = () => setCurrentView("logIn");
  const switchToSignup = () => setCurrentView("signUp");

  return (
    <section id="entry-page" className="login">
      {currentView === "signUp" ? (
        <Signup onSwitchToLogin={switchToLogin} />
      ) : (
        <Login onSwitchToSignup={switchToSignup} />
      )}
    </section>
  );
};

export default AuthPage;
