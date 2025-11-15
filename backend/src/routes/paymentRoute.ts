import { Router } from "express";
import {
  cancelPaymentIntent,
  createPaymentIntent,
} from "../controller/paymentController";

const router = Router();

router.post("/", createPaymentIntent);
router.post("/cancel", cancelPaymentIntent);

export default router;
