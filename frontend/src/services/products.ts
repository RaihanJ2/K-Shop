import axios from "axios";
import { ProductType } from "../types";

export const fetchProducts = async (): Promise<ProductType[]> => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
    return res.data;
  } catch (error) {
    console.error("Error fetching products", error);
    return [];
  }
};

// fetch product by id
export const fetchProductsById = async (
  id: string
): Promise<ProductType | null> => {
  try {
    // Ensure id is a string before sending the request
    if (typeof id !== "string") {
      console.error("Invalid product ID:", id);
      return null;
    }

    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/products/${id}`
    );
    return res.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
};
