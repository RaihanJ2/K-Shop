import axios from "axios";

export const createPaymentIntent = async (amount: number) => {
  try {
    const response = await axios.post(`${import.meta.env.API_URL}/payment`, {
      amount,
    });
    return response.data.clientSecret;
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw error;
  }
};

export const cancelPaymentIntent = async (paymentIntentId: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.API_URL}/payment/cancel`,
      {
        paymentIntentId,
      }
    );
    return response.data.canceledPaymentIntent;
  } catch (error) {
    console.error("Error canceling payment intent:", error);
    throw error;
  }
};
