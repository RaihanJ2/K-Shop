import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { cancelPaymentIntent, createPaymentIntent } from "../services/payment";
import { useNavigate } from "react-router-dom";
import { PaymentProps } from "../types";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  import.meta.env.VITE_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Payment = ({ amount, onSuccess, userId }: PaymentProps) => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handlePayClick = async () => {
    if (amount <= 0) {
      alert("There are no items in the cart.");
      return;
    }

    setIsLoading(true);

    try {
      const secret = await createPaymentIntent(amount);
      setClientSecret(secret);

      const paymentIntentId = secret.split("_secret")[0];
      setPaymentIntentId(paymentIntentId);
    } catch (error) {
      console.error("Error creating payment intent:", error);
      alert("Failed to initialize payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelClick = async () => {
    if (!paymentIntentId) {
      alert("No payment intent to cancel.");
      return;
    }
    try {
      await cancelPaymentIntent(paymentIntentId);
      alert("Payment canceled successfully.");
      setClientSecret(null);
      setPaymentIntentId(null);
    } catch (error) {
      console.error("Error canceling payment intent:", error);
      alert("Failed to cancel payment. Please try again.");
    }
  };

  const handlePurchaseComplete = async () => {
    console.log("Purchase completed! Showing modal...");
    setIsComplete(true);
    onSuccess();
  };

  const handleCloseModal = () => {
    setIsComplete(false);
    navigate("/");
  };

  return (
    <>
      {!clientSecret ? (
        <button
          onClick={handlePayClick}
          disabled={isLoading}
          className="bg-blue-600 w-1/5 text-gray-100 p-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        >
          {isLoading ? "Processing..." : "Pay"}
        </button>
      ) : (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm
            amount={amount}
            onSuccess={handlePurchaseComplete}
            onCancel={handleCancelClick}
            userId={userId}
          />
        </Elements>
      )}
      {isComplete && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Purchase Completed!</h2>
            <p className="mb-4 dark:text-gray-800 text-gray-100">
              Thank you for your purchase.
            </p>
            <button
              onClick={handleCloseModal}
              className="bg-blue-600 text-gray-100 p-2 rounded-md hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Payment;
