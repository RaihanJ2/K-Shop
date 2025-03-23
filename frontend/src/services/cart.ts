import axios from "axios";

const API_URL = "http://localhost:5000";

export const fetchCart = async () => {
  try {
    const res = await axios.get(`${API_URL}/carts`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching cart", error);
  }
};

export const addToCart = async (ProductId: string, quantity: number = 1) => {
  try {
    const res = await axios.post(
      `${API_URL}/carts/items`,
      {
        ProductId,
        quantity,
      },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    console.error("Error adding product to cart", error);
  }
};
export const updateCart = async (ProductId: string, quantity: number) => {
  try {
    const res = await axios.put(
      `${API_URL}/carts/items`,
      {
        ProductId,
        quantity,
      },
      { withCredentials: true }
    );
    return res.data;
  } catch (error) {
    console.error("Error updating product in cart", error);
  }
};
export const removeFromCart = async (ProductId: string) => {
  try {
    const res = await axios.delete(`${API_URL}/carts/items/${ProductId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Error adding product to cart", error);
  }
};
export const clearCart = async () => {
  try {
    const response = await axios.delete(`${API_URL}/carts`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error clearing cart:", error);
    throw new Error("Failed to clear cart");
  }
};
