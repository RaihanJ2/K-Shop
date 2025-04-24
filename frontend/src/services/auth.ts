import axios from "axios";
import { UserType } from "../types";

axios.defaults.withCredentials = true;

export const loginUser = async (userData: UserType) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      userData
    );
    return res.data;
  } catch (error) {
    console.error("Error during login", error);
    throw error;
  }
};

export const registerUser = async (userData: UserType) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/register`,
      userData
    );
    return res.data;
  } catch (error) {
    console.error("Error during registration", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`);
    return res.data;
  } catch (error) {
    console.error("Error during logout", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`);
    return res.data;
  } catch (error) {
    console.error("Error fetching current user", error);
    throw error;
  }
};
