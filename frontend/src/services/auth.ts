import axios from "axios";
import { UserType } from "../types";

const API_URL = "http://localhost:5000/auth";

export const loginUser = async (userData: UserType) => {
  try {
    const res = await axios.post(`${API_URL}/login`, userData, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Error during login", error);
    throw error;
  }
};

export const registerUser = async (userData: UserType) => {
  try {
    const res = await axios.post(`${API_URL}/register`, userData, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Error during registration", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const res = await axios.post(
      `${API_URL}/logout`,
      {},
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    console.error("Error during logout", error);
    throw error;
  }
};
