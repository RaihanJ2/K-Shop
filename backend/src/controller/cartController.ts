import { Request, Response } from "express";
import Cart from "../models/Cart";

export const findOrCreateCart = async (sessionId: string) => {
  let cart = await Cart.findOne({ sessionId });
  if (!cart) {
    cart = new Cart({ sessionId, items: [] });
  }
  return cart;
};

export const getCart = async (req: Request, res: Response) => {
  try {
    const sessionId = req.sessionID;
    const carts = await Cart.findOne({ sessionId }).populate("items.ProductId");

    if (!carts) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }

    res.json(carts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
};

export const addItemToCart = async (req: Request, res: Response) => {
  const { ProductId, quantity } = req.body;
  try {
    const sessionId = req.sessionID;
    let cart = await findOrCreateCart(sessionId);

    const itemIndex = cart.items.findIndex(
      (item) => item.ProductId.toString() === ProductId
    );

    if (itemIndex >= 0) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ ProductId, quantity });
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding product to cart" });
  }
};

export const updateCartItem = async (req: Request, res: Response) => {
  const sessionId = req.sessionID;
  if (!sessionId) {
    res.status(400).json({ message: "Session ID is missing" });
    return;
  }

  const { ProductId, quantity } = req.body;
  if (!ProductId || !quantity) {
    res.status(400).json({ message: "ProductId and quantity are required" });
    return;
  }

  try {
    let cart = await findOrCreateCart(sessionId);

    const itemIndex = cart.items.findIndex(
      (item) => item.ProductId.toString() === ProductId
    );

    if (itemIndex >= 0) {
      const item = cart.items[itemIndex];
      if (!item || typeof item.quantity !== "number" || item.quantity <= 0) {
        res.status(400).json({ message: "Invalid quantity in cart" });
        return;
      }

      item.quantity += quantity;

      if (item.quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      }

      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    console.error("Error updating product quantity in cart:", error);
    res
      .status(500)
      .json({ message: "Error updating product quantity in cart" });
  }
};

export const deleteCartItem = async (req: Request, res: Response) => {
  const { productId } = req.params;
  try {
    const sessionId = req.sessionID;
    const cart = await findOrCreateCart(sessionId);

    const itemIndex = cart.items.findIndex(
      (item) => item.ProductId.toString() === productId
    );

    if (itemIndex >= 0) {
      cart.items.splice(itemIndex, 1);
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ message: "Error removing product from cart" });
  }
};

export const clearCart = async (req: Request, res: Response) => {
  try {
    const sessionId = req.sessionID;
    const cart = await Cart.findOne({ sessionId });

    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ message: "Error clearing cart" });
  }
};
