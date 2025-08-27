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
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
      withCredentials: true,
      timeout: 10000,
    });

    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("❌ Error fetching current user:", error);
    console.log("Error response:", error.response?.data);
    console.log("Error status:", error.response?.status);

    // Re-throw the error so the caller can handle it appropriately
    throw error;
  }
};
