// utils/validation.js
export const validateUsername = (username) => {
  if (!/^[a-zA-Z0-9_]{3,15}$/.test(username)) {
    return "Username must be 3-15 characters and contain only letters, numbers, underscores.";
  }
  return "";
};

export const validateEmail = (email) => {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Invalid email format.";
  }
  return "";
};

export const validatePassword = (password) => {
  if (password.length < 6) {
    return "Password must be at least 6 characters long.";
  }
  return "";
};
export const validateGrade = (grade) => {
  if (!grade) {
    return "You have to choose your grade";
  }
  return "";
};
