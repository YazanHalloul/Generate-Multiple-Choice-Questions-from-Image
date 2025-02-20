import React, { useContext, useState } from "react";
import { loginUser } from "../../Api/apiService";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Pages/Context/Context";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const Login = ({ onSwitchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setAuth } = useContext(UserContext);

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    switch (id) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await loginUser(email, password);
      if (response.status === 200) {
        // NotificationManager.success("Success message", "Title here");
        setAuth({
          id: response.data.relatedTeacherNumber
            ? response.data.relatedTeacherNumber
            : response.data.id,
        });
        response.data.relatedTeacherNumber
          ? navigate("/studentPage", { replace: true })
          : navigate("/teacherPage", { replace: true });
      } else {
        NotificationManager.error("Login Failed", "Error message");
      }
    } catch (error) {
      NotificationManager.error("An error occurred while login", "Error message");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Welcome Back!</h2>
        <fieldset>
          <legend>Log In</legend>
          <ul>
            <li>
              <label htmlFor="email">email:</label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={handleInputChange}
                required
              />
            </li>
            <li>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handleInputChange}
                required
              />
            </li>
          </ul>
        </fieldset>
        <button type="submit">Login</button>
        <button type="button" onClick={onSwitchToSignup}>
          Create an Account
        </button>
      </form>
      <NotificationContainer />
    </>
  );
};

export default Login;
