import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { signupUser, getTeachers } from "../../Api/apiService";
import { UserContext } from "../../Pages/Context/Context";
import { handlePassword, validateEmail, validateUsername } from "./validators";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";

const SignUp = ({ onSwitchToLogin }) => {
  const [userType, setUserType] = useState("teacher");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [teacherNumber, setTeacherNumber] = useState("");
  const [relatedTeacherNumber, setRelatedTeacherNumber] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useContext(UserContext);

  useEffect(() => {
    if (userType === "student") {
      fetchTeachers();
    }
  }, [userType]);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    switch (id) {
      case "username":
        setUsername(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      // case "confirmPassword":
      //   setConfirmPassword(value);
      //   break;
      case "teacherNumber":
        setTeacherNumber(value);
        break;
      case "relatedTeacherNumber":
        setRelatedTeacherNumber(value);
        break;
      default:
        break;
    }
  };
  // const checkPassword= ()=>{
  //   return (password === confirmPassword);
  // }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !handlePassword(password, setErrorMessage) ||
      !validateUsername(username, setErrorMessage) ||
      !validateEmail(email, setErrorMessage)
    ) {
      NotificationManager.error(errorMessage, "Error message");
      return;
    }
    const userData = {
      email,
      password,
      username,
      teacherNumber: teacherNumber.length === 0 ? null : teacherNumber,
      relatedTeacherNumber:
        relatedTeacherNumber.length === 0 ? null : relatedTeacherNumber,
    };

    try {
      const response = await signupUser(userData);
      if (response.status === 201) {
        alert("Signup successful");
        setAuth({
          id: response.data.relatedTeacherNumber
            ? response.data.relatedTeacherNumber
            : response.data.id,
        });
        response.data.relatedTeacherNumber
          ? navigate("/studentPage", { replace: true })
          : navigate("/teacherPage", { replace: true });
      } else {
        alert("Signup failed");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  const fetchTeachers = async () => {
    try {
      const data = await getTeachers();
      setTeachers(data);
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Sign Up!</h2>
        <fieldset>
          <legend>Create Account</legend>
          <ul>
            <li>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleInputChange}
                required
              />
            </li>
            <li>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleInputChange}
                required
              />
            </li>
            <li>
              <label htmlFor="password" onClick={togglePasswordVisibility}>Password:</label>
              <input
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                value={password}
                onChange={handleInputChange}
                required
              />
            </li>
            {/* <li>
            <label htmlFor="confirmPassword">Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleInputChange}
              required
            />
          </li> */}
            {userType === "teacher" ? (
              <li>
                <label htmlFor="teacherNumber">Teacher Id:</label>
                <input
                  type="number"
                  id="teacherNumber"
                  value={teacherNumber}
                  onChange={handleInputChange}
                  required
                />
              </li>
            ) : (
              <li>
                <label htmlFor="relatedTeacherNumber">Teacher Id:</label>
                <select
                  id="relatedTeacherNumber"
                  value={relatedTeacherNumber}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    Select a teacher
                  </option>
                  {teachers.map((teacher) => (
                    <option key={teacher.id} value={teacher.id}>
                      {teacher.username}
                    </option>
                  ))}
                </select>
              </li>
            )}
          </ul>
        </fieldset>
        <button type="submit">Submit</button>
        <button type="button" onClick={onSwitchToLogin}>
          Have an Account?
        </button>
        <button
          type="button"
          onClick={() => {
            setUserType(userType === "teacher" ? "student" : "teacher");
            setTeacherNumber("");
            setRelatedTeacherNumber("");
          }}
        >
          Switch to {userType === "teacher" ? "Student" : "Teacher"}
        </button>
      </form>
      <NotificationContainer />
    </>
  );
};

export default SignUp;
