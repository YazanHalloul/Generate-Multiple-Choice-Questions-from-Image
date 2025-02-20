// validators.js

export function handlePassword(password, setErrorMessage) {
  var lowerCase = /[a-z]/g;
  var upperCase = /[A-Z]/g;
  var numbers = /[0-9]/g;
  
  if (!password.match(lowerCase)) {
    setErrorMessage("Password should contain lowercase letters!");
    return false;
  } else if (!password.match(upperCase)) {
    setErrorMessage("Password should contain uppercase letters!");
    return false;
  } else if (!password.match(numbers)) {
    setErrorMessage("Password should contain numbers also!");
    return false;
  } else if (password.length < 8) {
    setErrorMessage("Password length should be more than 8.");
    return false;
  } else {
    setErrorMessage("");
    return true;
  }
}

export function validateEmail(email, setErrorMessage) {
  var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (!email.match(emailPattern)) {
    setErrorMessage("Please enter a valid email address.");
    return false;
  } else {
    setErrorMessage("");
    return true;
  }
}

export function validateUsername(username, setErrorMessage) {
  var usernamePattern = /^[a-zA-Z0-9_]{3,20}$/;

  if (!username.match(usernamePattern)) {
    setErrorMessage("Username should be 3-20 characters long and can only contain letters, numbers, and underscores.");
    return false;
  } else {
    setErrorMessage("");
    return true;
  }
}
