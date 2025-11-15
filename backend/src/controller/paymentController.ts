import { Request, Response } from "express";
import stripe from "../config/stripe";

export const createPaymentIntent = async (req: Request, res: Response) => {
  const { amount } = req.body;

  try {
    const amountInCents = Math.round(amount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const cancelPaymentIntent = async (req: Request, res: Response) => {
  const { paymentIntentId } = req.body;

  if (!paymentIntentId) {
    res.status(400).json({ error: "Payment Intent ID is required" });
    return;
  }

  try {
    const canceledPaymentIntent = await stripe.paymentIntents.cancel(
      paymentIntentId
    );
    res.status(200).json({ canceledPaymentIntent });
  } catch (error) {
    console.error("Error canceling payment intent:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
