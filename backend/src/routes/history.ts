import { Request, Response, Router } from "express";
import History from "../models/History";
import { isAuthenticated } from "../middleware";

const router = Router();

// Get the history for a user
router.get("/", isAuthenticated, async (req: Request, res: Response) => {
  try {
    const userId = req.session.user?._id;
    const history = await History.find({ userId })
      .populate("items.productId")
      .populate("addressId");

    if (!history || history.length === 0) {
      res.status(404).json({ message: "No history found for this user" });
      return;
    }

    res.json(history);
  } catch (error) {
    console.error("Error fetching history:", error);
    res.status(500).json({ message: "Error fetching history" });
  }
});

router.get(
  "/:orderId",
  isAuthenticated,
  async (req: Request, res: Response) => {
    try {
      const order = await History.findById(req.params.orderId)
        .populate("items.productId")
        .populate("addressId");

      if (!order) {
        res.status(404).json({ message: "Order not found" });
        return;
      }

      res.json(order);
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ message: "Error fetching order" });
    }
  }
);

// Create a new history entry
router.post("/", isAuthenticated, async (req: Request, res: Response) => {
  const userId = req.session.user?._id;
  const { items, totalAmount, addressId } = req.body;

  if (!items || !totalAmount || !addressId) {
    res
      .status(400)
      .json({ message: "Items, totalAmount, and addressId are required" });
    return;
  }

  try {
    const newHistory = new History({
      userId,
      items,
      totalAmount,
      addressId,
    });

    await newHistory.save();
    res.status(201).json(newHistory);
  } catch (error) {
    console.error("Error creating history entry:", error);
    res.status(500).json({ message: "Error creating history entry" });
  }
});

export default router;
