import axios from "axios";

export const fetchCurrentUser = async () => {
  try {
    const response = await axios.get(`${import.meta.env.API_URL}/user`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
};
