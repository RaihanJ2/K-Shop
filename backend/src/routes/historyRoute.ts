import { Router } from "express";

import { isAuthenticated } from "../middleware";
import {
  createHistory,
  getHistory,
  getOrderById,
} from "../controller/historyController";

const router = Router();

router.get("/", isAuthenticated, getHistory);
router.get("/:orderId", isAuthenticated, getOrderById);
router.post("/", isAuthenticated, createHistory);

export default router;
