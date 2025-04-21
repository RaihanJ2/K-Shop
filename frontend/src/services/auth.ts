import axios from "axios";
import { UserType } from "../types";

export const loginUser = async (userData: UserType) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      userData,
      {
        withCredentials: true,
      }
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
      userData,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error during registration", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/logout`,
      {},
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    console.error("Error during logout", error);
    throw error;
  }
};
