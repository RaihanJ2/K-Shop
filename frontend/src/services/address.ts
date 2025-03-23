import axios from "axios";
import { AddressType } from "../types";
const API_URL = "http://localhost:5000";

export const fetchAddress = async () => {
  try {
    const res = await axios.get(`${API_URL}/address`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching address:", error);
    throw error;
  }
};

export const setAddress = async (addressId: string) => {
  try {
    const res = await axios.post(
      `${API_URL}/address/setDefault`,
      { addressId },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    console.error("Error setting default address:", error);
    throw error;
  }
};

export const addAddress = async (address: AddressType) => {
  try {
    const res = await axios.post(`${API_URL}/address/postAddress`, address, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Error adding address:", error);
    throw error;
  }
};
