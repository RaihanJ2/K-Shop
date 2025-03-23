import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { PaymentProps } from "../types";

const CheckoutForm = ({ onSuccess, onCancel }: PaymentProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setShowConfirmation(true);
  };

  const handleConfirmPayment = async () => {
    if (!stripe || !elements) {
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      console.error("Error confirming payment:", error);

      setShowConfirmation(false);
    } else {
      onSuccess();
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <PaymentElement className="border p-4 rounded-md" />
        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
        >
          Pay
        </button>
      </form>

      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="dark:bg-white bg-black p-6 rounded-lg shadow-lg">
            <h2 className="dark:text-black text-white text-2xl text-center font-bold mb-4">
              Confirm Payment
            </h2>
            <p className="mb-4 dark:text-black text-white">
              Are you sure you want to proceed with the payment?
            </p>
            <div className="flex justify-evenly gap-4">
              <button
                onClick={handleConfirmPayment}
                className="bg-green-600 text-white p-2 rounded-md hover:bg-green-700"
              >
                Confirm
              </button>
              <button
                onClick={() => {
                  setShowConfirmation(false);
                  onCancel();
                }}
                className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;
