import { Router } from "express";

import { isAuthenticated } from "../middleware";
import {
  addItemToCart,
  clearCart,
  deleteCartItem,
  getCart,
  updateCartItem,
} from "../controller/cartController";

const router = Router();

router.get("/", isAuthenticated, getCart);
router.post("/items", isAuthenticated, addItemToCart);
router.put("/items", isAuthenticated, updateCartItem);
router.delete("/items/:productId", isAuthenticated, deleteCartItem);
router.delete("/", isAuthenticated, clearCart);

export default router;
