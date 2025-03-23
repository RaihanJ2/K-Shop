import axios from "axios";

const API_URL = "http://localhost:5000";

export const fetchCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/user`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
};
