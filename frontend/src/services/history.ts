import axios from "axios";
import { HistoryType } from "../types";

export const fetchOrderById = async (orderId: string): Promise<HistoryType> => {
  try {
    const res = await axios.get(
      `${import.meta.env.API_URL}/history/${orderId}`,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw new Error("Failed to fetch order. Please try again.");
  }
};

export const fetchHistory = async (): Promise<HistoryType[]> => {
  try {
    const res = await axios.get(`${import.meta.env.API_URL}/history`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching history:", error);
    return [];
  }
};
export const createHistory = async (
  history: HistoryType
): Promise<HistoryType> => {
  try {
    const res = await axios.post(
      `${import.meta.env.API_URL}/history`,
      history,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error creating history:", error);
    throw new Error("Failed to create history. Please try again."); // Rethrow with a custom message
  }
};
