import { api } from "../api";

export const validateFormData = (subject, category, description, priority) => {
  return subject && category && description && priority;
};


export const checkForSwearWords = async (text) => {
  
  const endpoint = `/api/swearwords/check?text=${encodeURIComponent(text)}`;

  try {
    const response = await api.get(endpoint);
    // console.log(response);
    const data = response.data;
    console.log(data.rsp.found);
    if (data.rsp.found === '1') {
      return true; // Swear word detected
    }
  } catch (error) {
    console.error('Error checking for swear words:', error);
  }

//   return false; // Swear word not detected or error occurred
};




export const validateEmail = async (email) => {
  if (!email.trim()) {
    return false;
  }
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = async (password) => {
  if (!password.trim()) {
    return false;
  }
  return password.length >= 8 && /\d/.test(password);
};


export const validateFirstName = async (firstName) => {
  return !!firstName.trim(); 
};

export const validateLastName = async (lastName) => {
  return !!lastName.trim(); 
};