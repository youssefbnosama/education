// Validate course title (3–50 chars, letters, numbers, spaces, dashes)
export const validateCourseTitle = (title) => {
  if (!/^.{3,50}$/.test(title)) {
    return "Title must be 3–50 characters and contain only letters, numbers, spaces, or dashes.";
  }
  return "";
};

// Validate image URL
export const validateCourseImage = (url) => {
  if (!/^https?:\/\/.*\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url)) {
    return "Please provide a valid image URL (jpg, png, gif, webp, svg).";
  }
  return "";
};

// Validate description (min 10 chars)
export const validateCourseDescription = (desc) => {
  if (desc.trim().length < 10) {
    return "Description must be at least 10 characters long.";
  }
  return "";
};

// Validate price (positive number, max 9999)
export const validateCoursePrice = (price) => {
  if (!/^\d+(\.\d{1,2})?$/.test(price) || Number(price) <= 0) {
    return "Price must be a positive number (up to 2 decimals).";
  }
  if (Number(price) > 9999) {
    return "Price cannot exceed 9999.";
  }
  return "";
};

// Validate grade (must be chosen)
export const validateCourseGrade = (grade) => {
  if (!grade) {
    return "You must choose a grade.";
  }
  if (!["Sec-1", "Sec-2", "Sec-3"].includes(grade.toString())) {
    return "Invalid grade selection.";
  }
  return "";
};
