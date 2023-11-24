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
