import axios from "axios";
import { AddressType } from "../types";

export const fetchAddress = async () => {
  try {
    const res = await axios.get(`${import.meta.env.API_URL}/address`, {
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
      `${import.meta.env.API_URL}/address/setDefault`,
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
    const res = await axios.post(
      `${import.meta.env.API_URL}/address/postAddress`,
      address,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error adding address:", error);
    throw error;
  }
};
